jQuery(function() {
    $('#form').on('submit', function (event) {
        event.preventDefault();

        processForm('decrypt');
    });

    $('#form').on('click', '#decrypt', function (event) {
        event.preventDefault();

        processForm('decrypt');
    });

    $('#form').on('click', '#encrypt', function (event) {
        processForm('encrypt');
    });

    function processForm(operation = 'decrypt') {
        var content = $('#form #content').val();
        var key = $('#form #key').val();
        var result = '';

        if ('decrypt' === operation) {
            result = decrypt(content, key);
        } else {
            result = encrypt(content, key);
        }

        $('#result').html(result);
    }

    function decrypt(content, key) {
        return Aes.Ctr.decrypt(content, key, 256);
    }

    function encrypt(content, key) {
        return Aes.Ctr.encrypt(content, key, 256);
    }

    $('#form').on('click', '.display-hide', function (event) {
        ('password' === $('[name="' + $(this).data('name') + '"]').attr('type'))
            ? $('[name="' + $(this).data('name') + '"]').attr('type', 'text')
            : $('[name="' + $(this).data('name') + '"]').attr('type', 'password')
        ;
    });
});
