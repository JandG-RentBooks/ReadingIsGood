<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Book;
use App\Models\FrontPage;
use App\Models\Lending;
use App\Models\LendingBook;
use App\Models\Payment;
use App\Models\Testimonial;
use App\Models\User;
use App\Models\Wishlist;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Dirape\Token\Token;
use Illuminate\Support\Facades\Validator;

class DashboardController extends Controller
{

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function getStatCardsData(Request $request): JsonResponse
    {
        $this->accessEmployee();

        $queryUsers = User::query()->whereRelation('roles', 'reference', '=', 'user');
        $users = $queryUsers;
        $allRegisteredUsers = $users->count();
        $allSubscribedUsers = $queryUsers->whereNotNull('last_payment_date')->count();

        $books = Book::all();
        $inStock = 0;
        foreach ($books as $book) {
            $inStock += $book->in_stock;
        }
        $allBooks = $inStock;
        $allRentedBooks = LendingBook::where('is_back', '=', 0)->count();
        $allLendings = Lending::all()->count();
        $allCurrentLendings = Lending::where('state', '=', 3)->count();
        $allTestimonials = Testimonial::all()->count();
        $moderatedTestimonials = Testimonial::where('checked', 1)->where('is_active', '=', 0)->count();

        $data = [
            'allRegisteredUsers' => $allRegisteredUsers,
            'allSubscribedUsers' => $allSubscribedUsers,
            'allBooks' => $allBooks,
            'allRentedBooks' => $allRentedBooks,
            'allLendings' => $allLendings,
            'allCurrentLendings' => $allCurrentLendings,
            'allTestimonials' => $allTestimonials,
            'moderatedTestimonials' => $moderatedTestimonials,
        ];

        return response()->json($data, 200);
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function getActiveLendings(Request $request): JsonResponse
    {
        $this->accessEmployee();

        $query = Lending::query();
        $query = $query->with('books')
            ->with('books.authors')
            ->with('books.language')
            ->with('books.publisher')
            ->with('user')
            ->with('user.active_shipping_address')
            ->with('createdBy')
            ->where('state', '=', 3)
            ->orderBy('created_at');
        $lendings = $query->paginate($this->getPageLength($request));

        $result = [
            'items' => $lendings,
            'pagination' => $this->getPaginationForJson($lendings),
        ];

        return response()->json($result, 200);
    }

    /**
     * @param Request $request
     * @param $id
     * @return JsonResponse
     */
    public function getLending(Request $request, $id): JsonResponse
    {
        $this->accessEmployee();

        $data = Lending::with('books')
            ->with('books.authors')
            ->with('books.language')
            ->with('books.publisher')
            ->with('user')
            ->with('user.active_shipping_address')
            ->with('createdBy')
            ->where('id', $id)->first();

        return response()->json($data, 200);
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function getUserByPaymentId(Request $request): JsonResponse
    {
        $this->accessEmployee();

        $data = User::with('subscription_type')
            ->with('active_shipping_address')
            ->where('payment_id', $request->input('payment_id'))->first();

        return response()->json(['user' => $data], 200);
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function updateLastPaymentDate(Request $request): JsonResponse
    {
        $this->accessEmployee();

        $user = User::where('id', $request->input('user_id'))->with('subscription_type')->first();
        if (!$user) {
            return response()->json(['success' => false], 200);
        }
        $user->last_payment_date = $request->input('last_payment_date');
        $user->save();

        Payment::create([
            'user_id' => $user->id,
            'subscription_type_id' => $user->subscription_type->id ?? null,
            'act_price' => $user->subscription_type->price ?? null,
            'created_by' => auth()->user()->id,
            'updated_by' => auth()->user()->id,
        ]);

        return response()->json(['success' => true], 200);
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function getRelevantUsers(Request $request): JsonResponse
    {
        $this->accessEmployee();

        $query = User::query();
        $query = $query->with('subscription_type')
            ->with('active_shipping_address')
            ->with('lendings')
            ->with('wishlist')
            ->whereNotNull('subscription_type_id')
            ->whereNotNull('active_shipping_address_id')
            ->whereDate('last_payment_date', '>=', now()->subMonth()->subDays(5))
            ->whereDoesntHave('lendings')
            ->whereHas('wishlist')
            ->where('is_active_lending', '=', 0)
            ->orderBy('created_at');

        $users = $query->paginate($this->getPageLength($request));

        $result = [
            'items' => $users,
            'pagination' => $this->getPaginationForJson($users),
        ];

        return response()->json($result, 200);
    }

    /**
     * @param Request $request
     * @param $id
     * @return JsonResponse
     */
    public function getUser(Request $request, $id): JsonResponse
    {
        $this->accessEmployee();

        $user = User::with('subscription_type')
            ->with('active_shipping_address')
            ->where('id', $id)->first();

        $wishlist = Wishlist::join('books', 'books.id', '=', 'wishlists.book_id')
            ->select('wishlists.id as wishlist_id', 'books.*')
            ->where('user_id', $id)
            ->orderBy('sort')
            ->get();

        $result = [
            'user' => $user,
            'wishlist' => $wishlist,
        ];

        return response()->json($result, 200);
    }

    /**
     * @param Request $request
     * @return JsonResponse
     * @throws \Exception
     */
    public function storeLending(Request $request): JsonResponse
    {
        $this->accessEmployee();

        $user = User::find($request->input('user_id'));
        if (!$user) {
            return response()->json(['success' => false], 200);
        }
        $token = new Token();
        $shipping_token = $token->UniqueNumber('lendings', 'shipping_token', 12);
        $lending = Lending::create([
            'user_id' => $request->input('user_id'),
            'shipping_token' => $shipping_token,
            'state' => 2,
            'created_by' => auth()->user()->id,
        ]);

        return response()->json(['success' => true, 'id' => $lending->id], 200);
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function addBookToLending(Request $request): JsonResponse
    {
        $this->accessEmployee();

        $books = $request->input('books');
        $lending = Lending::find($request->input('lending_id'));

        if (!$lending) {
            return response()->json(['success' => false], 200);
        }
        foreach ($books as $book_id) {
            $book = Book::find($book_id);

            if ($book && $book->available > 0) {
                LendingBook::create([
                    'lending_id' => $request->input('lending_id'),
                    'book_id' => $book_id,
                    'is_back' => 0,
                ]);
                $book->available = $book->available - 1;
                $book->save();
            }
        }
        return response()->json(['success' => true], 200);
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function removeBook(Request $request): JsonResponse
    {
        $this->accessEmployee();

        $book = Book::find($request->input('book_id'));
        $lending = Lending::find($request->input('lending_id'));

        if (!$book || !$lending) {
            return response()->json(['success' => false], 200);
        }

        $lendingBook = LendingBook::where([
            ['lending_id', $request->input('lending_id')],
            ['book_id', $request->input('book_id')],
        ]);

        if ($lendingBook->delete()) {
            $book->available = $book->available + 1;
            $book->save();

            return response()->json(['success' => true], 200);
        } else {
            return response()->json(['success' => false], 200);
        }
    }

    public function removeBooksFromUserWishlist(Request $request): JsonResponse
    {
        $this->accessEmployee();

        $user = User::find($request->input('user_id'));
        if (!$user) {
            return response()->json(['success' => false], 200);
        }

        $books = $request->input('books');

        foreach ($books as $book) {
            Wishlist::where('user_id', $user->id)->where('book_id', $book)->delete();
        }

        return response()->json(['success' => true], 200);
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function updateLendingState(Request $request): JsonResponse
    {
        $this->accessEmployee();

        $lending = Lending::with('user')->where('id', $request->input('lending_id'))->first();

        if (!$lending) {
            return response()->json(['success' => false], 200);
        }

        $lending->state = $request->input('state');
        $lending->save();

        if ($request->input('state') == 3) {
            $this->updateUserState($lending->user->id);
        }

        return response()->json(['success' => true], 200);
    }

    /**
     * Felhasználónak van aktív kölcsönzése
     * @param $user
     * @return JsonResponse
     */
    public function updateUserState($user_id): JsonResponse
    {
        $this->accessEmployee();

        $user = User::find($user_id);
        $user->is_active_lending = 1;
        $user->save();

        return response()->json(['success' => true], 200);
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function getLandingsForPackaging(Request $request): JsonResponse
    {
        $this->accessEmployee();

        $query = Lending::query();
        $query = $query->with('books')
            ->with('books.authors')
            ->with('books.language')
            ->with('books.publisher')
            ->with('user')
            ->with('user.active_shipping_address')
            ->with('createdBy')
            ->where('state', '=', 2)
            ->orderBy('created_at');
        $lendings = $query->paginate($this->getPageLength($request));

        $result = [
            'items' => $lendings,
            'pagination' => $this->getPaginationForJson($lendings),
        ];

        return response()->json($result, 200);
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function getLandingByShippingToken(Request $request): JsonResponse
    {
        $this->accessEmployee();

        $data = Lending::with('books')
            ->with('books.authors')
            ->with('books.language')
            ->with('books.publisher')
            ->with('user')
            ->with('user.active_shipping_address')
            ->with('createdBy')
            ->where('shipping_token', $request->input('shipping_token'))
            ->where('state', '=', 3)->first();

        return response()->json(['lending' => is_null($data) ? null : $data], 200);
    }

    /**
     * Könyv selejtezése
     * @param Request $request
     * @return JsonResponse
     */
    public function bookScrapping(Request $request): JsonResponse
    {
        $this->accessEmployee();

        $book = Book::find($request->input('book_id'));
        $lending = Lending::find($request->input('lending_id'));

        if (!$book || !$lending) {
            return response()->json(['success' => false], 200);
        }

        $lendingBook = LendingBook::where([
            ['lending_id', $request->input('lending_id')],
            ['book_id', $request->input('book_id')],
        ])->first();

        $lendingBook->is_back = 1;
        $lendingBook->save();

        return response()->json(['success' => true], 200);
    }

    /**
     * Könyv visszavételezése
     * @param Request $request
     * @return JsonResponse
     */
    public function increaseBookAvailableNumber(Request $request): JsonResponse
    {
        $this->accessEmployee();

        $book = Book::find($request->input('book_id'));
        $lending = Lending::find($request->input('lending_id'));

        if (!$book || !$lending) {
            return response()->json(['success' => false], 200);
        }

        $lendingBook = LendingBook::where([
            ['lending_id', $request->input('lending_id')],
            ['book_id', $request->input('book_id')],
        ])->first();

        $lendingBook->is_back = 1;
        $lendingBook->save();

        $book->available = $book->available + 1;
        $book->save();

        return response()->json(['success' => true], 200);
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function closeLending(Request $request): JsonResponse
    {
        $this->accessEmployee();

        $lending = Lending::with('user')->where('id', $request->input('lending_id'))->first();

        if (!$lending) {
            return response()->json(['success' => false], 200);
        }

        $lending->state = 4;
        $lending->save();

        $user = User::find($lending->user->id);
        $user->is_active_lending = 0;
        $user->save();

        return response()->json(['success' => true], 200);
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function getUncheckedReferenceComment(Request $request): JsonResponse
    {
        $this->accessEmployee();

        $testimonials = Testimonial::where('checked', '=', 0)->orderBy('created_at', 'DESC');

        $result = [
            'items' => $testimonials->get(),
            'items_num' => $testimonials->count(),
        ];

        return response()->json($result, 200);
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function referenceCommentChecked(Request $request): JsonResponse
    {
        $this->accessEmployee();

        $testimonial = Testimonial::find($request->input('id'));

        if (!$testimonial) {
            return response()->json(['success' => false], 200);
        }

        $testimonial->checked = 1;
        $testimonial->save();

        return response()->json(['success' => true], 200);
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function referenceCommentInactivate(Request $request): JsonResponse
    {
        $this->accessEmployee();

        $testimonial = Testimonial::find($request->input('id'));

        if (!$testimonial) {
            return response()->json(['success' => false], 200);
        }

        $testimonial->checked = 1;
        $testimonial->is_active = 0;
        $testimonial->save();

        return response()->json(['success' => true], 200);
    }

    public function getPageContent(Request $request): JsonResponse
    {
        $this->accessEmployee();

        $content = FrontPage::where('reference', '=', $request->get('reference'))->first();

        return response()->json(['item' => $content], 200);
    }

    public function updatePageContent(Request $request)
    {
        $this->accessEmployee();

        $validator = Validator::make($request->all(), [
            'content' => 'required|string',
        ]);

        if ($validator->fails()) {
            $response = [
                'success' => false,
                'errors' => $validator->errors(),
            ];
            return response()->json($response, 422);
        }

        $content = FrontPage::find($request->get('id'));

        if (!$content) {
            return response()->json(['success' => false], 200);
        }

        $content->content = $request->get('content');
        $content->save();

        return response()->json(['success' => true], 200);
    }

    public function getBadgeData(Request $request)
    {
        $this->accessEmployee();

        $forPackagesNum = Lending::where('state', '=', 2)->count();
        $testimonialsCommentNum = Testimonial::where('checked', '=', 0)->count();

        $result = [
            'forPackagesNum' => $forPackagesNum,
            'testimonialsCommentNum' => $testimonialsCommentNum,
        ];

        return response()->json($result, 200);
    }

}
