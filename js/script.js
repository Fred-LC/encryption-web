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
        let content = $('#form #content').val();
        let key = $('#form #key').val();
        let inputType = $('#form [name="input-type"]:checked').val();
        let result = '';

        if ('json' === inputType) {
            let jsonContent = JSON.parse(content);
            let jsonKeys = $('#form [name="json-keys"]').val().trim().split(',');

            for (const aJsonContent of jsonContent) {
                for (jsonKey in aJsonContent) {
                    if (aJsonContent.hasOwnProperty(jsonKey)) {
                        if (jsonKeys.length > 0) {
                            if (!jsonKeys.includes(jsonKey)) {
                                continue;
                            }
                        }

                        if ('decrypt' === operation) {
                            aJsonContent[jsonKey] = decrypt(aJsonContent[jsonKey], key);
                        } else {
                            aJsonContent[jsonKey] = encrypt(aJsonContent[jsonKey], key);
                        }
                    }
                }
            }

            result = JSON.stringify(jsonContent);
        } else {
            if ('decrypt' === operation) {
                result = decrypt(content, key);
            } else {
                result = encrypt(content, key);
            }
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
