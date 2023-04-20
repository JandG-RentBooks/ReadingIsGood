<!DOCTYPE html>
<html>
<head>
    <title>Reading is Good</title>
</head>
<body>
<h1>{{ $mailData['title'] }}</h1>
<p>{{ $mailData['body'] }}</p>
<p><a href="{{$mailData['url']}}">Regisztráció megerősítése</a></p>

<p>Üdvözlettel: Reading is Good</p>
</body>
</html>
