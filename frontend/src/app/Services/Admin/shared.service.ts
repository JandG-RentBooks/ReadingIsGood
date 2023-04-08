import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SharedService {

    postCover: any
    uiCover: any

    texts = {
        msg_creation_success: 'A tétel mentése sikeres!',
        msg_delete_success: 'A tétel törlése sikeres!',
        msg_update_success: 'A tétel adatainak mentése sikeres!',
        confirm_add: 'Biztos benne, hogy szeretné hozzáadni?',
        confirm_delete: 'Biztos benne, hogy törölni szeretné?',
        error_403: 'Nem engedélyezett művelet',
        error_401: 'Nem található felhasználó a megadott bejelentkezési adatokkal.',
        error_message: 'A művelet során nem várt hiba lépett fel.',
    }

    constructor() {
    }

    ngOnInit(): void {

    }

    sleep = (ms: number) => {
        return new Promise(resolve => setTimeout(resolve, ms))
    }

    showPostCover() {
        this.postCover = document.querySelector('#postCover')
        console.log('this.postCover')
        console.log(this.postCover)
        if (this.postCover !== null) {
            this.postCover.classList.remove('d-none')
        }
    }

    hidePostCover() {
        this.sleep(1000).then(() => {
            if (this.postCover !== null) {
                console.log('this.postCover')
                console.log(this.postCover)
                this.postCover.classList.add('d-none')
            }
        })
    }
    showUiCover() {
        this.uiCover = document.querySelector('#uiCover')
        if (this.uiCover !== null) {
            this.uiCover.classList.remove('d-none')
        }
    }

    hideUiCover() {
        this.sleep(500).then(() => {
            if (this.uiCover !== null) {
                this.uiCover.classList.add('d-none')
            }
        })
    }

    showCover(cover: any) {
        cover.classList.remove('d-none')
    }

    hideCover(cover: any) {
        cover.value.classList.add('d-none')
    }

    hideScrollbar() {
        // @ts-ignore
        document.querySelector('body').style.overflow = 'hidden'
    }

    showScrollbar() {
        // @ts-ignore
        document.querySelector('body').style.overflow = 'auto'
    }

    scrollTop() {
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0
    }

    transformDate = (date: any) => {
        if (date === null || date === '') {
            return ''
        }
        let newDate = new Date(date)
        let year = newDate.getFullYear()
        let m = newDate.getMonth() + 1
        let month = (m < 10) ? "0" + m : m
        let d = newDate.getDate()
        let day = (d < 10) ? "0" + d : d
        return year + "-" + month + "-" + day
    }

    errorHandler = (error: any) => {
        let message = ''
        if (error.status) {
            switch (error.status) {
                case 401:
                    message = this.texts.error_401
                    break
                case 403:
                    message = this.texts.error_403
                    break

                case 422:
                    let errors = Object.values(error.error.errors)
                    for (let i in errors) {
                        // @ts-ignore
                        message += `${errors[i][0]}<br>`
                    }
                    break
                case 500:
                    message = this.texts.error_message
                    break
                default:
                    message = this.texts.error_message
            }
        } else {
            let errors = Object.values(error.errors)
            for (let i in errors) {
                // @ts-ignore
                message += `${errors[i][0]}<br>`
            }
        }
        return message
    }

    openToast = (toastId: string, sourceId = null) => {
        let toast: any = document.getElementById(toastId)
        let sourceRect = null
        if (sourceId !== null) {
            // @ts-ignore
            sourceRect = document.getElementById(sourceId).getBoundingClientRect()
            toast.style.top = (sourceRect.bottom) + 'px'
            toast.style.left = (sourceRect.left - sourceRect.width) + 'px'
            if (toast.classList.contains('t-bottom-right')) {
                toast.classList.remove('t-bottom-right')
            }
        }
        toast.classList.add('show')

        this.sleep(3000).then(() => {
            if (toast.classList.contains('show')) {
                toast.classList.remove('show')
            }
        })
    }

}
