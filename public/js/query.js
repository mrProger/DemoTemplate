function isNull(value) {
    return value === null || value.trim() === "";
}

function loginQuery(csrf_token) {
    if (isNull($('#login').val()) || isNull($('#password').val())) {
        alert('Все поля должны быть заполнены');
        return;
    }

    $.ajax({
        url: '/api/v1/login',
        method: 'POST',
        dataType: 'json',
        data: {
            _token: csrf_token,
            login: $('#login').val(),
            password: $('#password').val()
        },
        success: (response) => {
            if (response.response === 'Вы успешно вошли в аккаунт') {
                window.location.href = '/';
            } else {
                alert(response.response);
            }
        },
        error: (response) => {
            response = JSON.parse(response.responseText);
            if (response.errors) {
                alert(response.errors[Object.keys(response.errors)[0]][0]);
            } else if (response.response) {
                alert(response.response);
            }
        }
    });
}

function registrationQuery(csrf_token) {
    if (isNull($('#name').val()) || isNull($('#surname').val()) || isNull($('#login').val()) ||
        isNull($('#email').val()) || isNull($('#password').val()) || isNull($('#password_repeat').val())) {
        alert('Все поля должны быть заполнены');
        return;
    }

    if (!$('#rules').is(':checked')) {
        alert('Необходимо согласиться с правилами');
        return;
    }

    $.ajax({
        url: '/api/v1/registration',
        method: 'POST',
        dataType: 'json',
        data: {
            _token: csrf_token,
            name: $('#name').val(),
            surname: $('#surname').val(),
            patronymic: $('#patronymic').val(),
            login: $('#login').val(),
            email: $('#email').val(),
            password: $('#password').val(),
            password_repeat: $('#password_repeat').val(),
            rules: $('#rules').is(':checked')
        },
        success: (response) => {
            if (response.response === 'Аккаунт успешно зарегистрирован') {
                window.location.href = '/';
            } else {
                alert(response.response);
            }
        },
        error: (response) => {
            response = JSON.parse(response.responseText);
            if (response.errors) {
                alert(response.errors[Object.keys(response.errors)[0]][0]);
            } else if (response.response) {
                alert(response.response);
            }
        }
    });
}

function logoutQuery(csrf_token) {
    $.ajax({
        url: '/api/v1/logout',
        method: 'POST',
        dataType: 'json',
        data: {
            _token: csrf_token
        },
        success: (response) => {
            if (response.response === 'Вы успешно вышли из аккаунта') {
                window.location.reload();
            }
        }
    });
}
