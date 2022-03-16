# Authorisation
## Yangi-Hisob Route:

`[POST request]: http://localhost:5000/api/yangi-hisob/`

```javascript
//post format
{
    "userName": "laziz",
    "password": "1234567890"
}

// TOKEN Qaydatdi __ Return's token
```
<details><summary>KO'RISH</summary>
<p>

```javascript
// Bu kabi - like this
      eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIzMDQxN2M2ZGU5YTkxNmRlMzFkODRlIn0sImlhdCI6MTY0NzQyOTAyOCwiZXhwIjoxNjQ3NDMyNjI4fQ.tDOjnWoRz-kKZOqRlbKL-mq2eATaJgpvw5vVMZgbXWk
```

</p>
</details>

<br/>
<hr/>
<br/>

## Tasdiqlash Route:

`[GET request]: http://localhost:5000/api/tasdiqlash/`

```javascript
//Token orqali Tasdiqlanadi, hozircha faollashtirimagan!
{
    "userName": "laziz",
    "password": "1234567890"
}
```

### Foydalanuvchi haqida ma'lumot qaytaradi (JOSN);

```javascript

//Bu holatda
{
    "_id": "6230417c6de9a916de31d84e",
    "userName": "mern.me",
    "admin": true,
    "verified": false,
    "__v": 0
}
```

<br/>
<hr/>
<br/>

## Kirish Route:

`[POST request]: http://localhost:5000/api/kirish/`

```javascript
// Huddi yangi hisob ochgan bilan bir xil, bu yerda ham token qaytadi
```

<br>
<hr>
<br>

## Barcha foydalanuchilarni ko'rish:
<sub>Faqat `admin user`lar uchun</sub>

`[GET request]: http://localhost:5000/barcha-hisoblar/`

```javascript
//All users Data

[
    {
        "_id": "62303e27347d9b22c5cd45eb",
        "userName": "zaydec",
        "password": "$2b$10$wLLXHgCt1bPWzEbEeoQUMeU7KVRztGgCDmARrpkbmcX0sNvg5krMi",
        "admin": false,
        "verified": false,
        "__v": 0
    },
    {
        "_id": "6230417c6de9a916de31d84e",
        "userName": "mern.me",
        "password": "$2b$10$3GGQ9mrdf/8lf7h.DucukewrJ0C6IULyrnGvwg.ByoQe1hGG4fBme",
        "admin": true,
        "verified": false,
        "__v": 0
    }
]
```