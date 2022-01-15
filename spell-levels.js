Hooks.on('renderAbilityUseDialog', function(options) {
    if (game.settings.get("dnd5eja", "SpellLevels") === true  ){
    if($('.dnd5e.dialog #ability-use-form select[name="level"]').length > 0) { // If the dialog box has a option to select a spell level

        // Resize the window to fit the contents
        let originalWindowHeight = parseInt($(options._element[0]).css('height'));
        let heightOffset = 42;

        $(options._element[0]).height(originalWindowHeight + heightOffset);
        
        // Find the label that says "Cast at level", and select it's parent parent (There's no specific class or ID for this wrapper)
        let levelSelectWrapper = $(options._element[0]).find('.form-group label:contains("使用する呪文スロット")').parent();
        let selectedLevel = levelSelectWrapper.find('select').val();

        let appId = options.appId;

        // Hide the default level select menu
        levelSelectWrapper.css('display', 'none');

        // Append a container for the buttons
        levelSelectWrapper.after(`
            <div class="form-group spell-lvl-btn">
                <label>使用する呪文スロット</label>
                <div class="form-fields"></div>
            </div>
        `);

        // Append a button for each spell level that the user can cast        
        $(options._element[0]).find(`select[name="level"] option`).each(function() {

            let availableSlots = $(this).text().match(/\(\d+\s[ｦ-ﾟ]+\)/)[0].match(/\d+/)[0];
            let availableSlotsBadge = '';
            let value = $(this).val();
            let i;

            if(value == "pact") {
                i = "p" + $(this).text().match(/\d/)[0]; // Get the pact slot level
            } else {
                i = value;
            }

            if(availableSlots > 0) {
                availableSlotsBadge = `<span class="available-slots">${availableSlots}</span>`;
            }

            $(options._element[0]).find('.spell-lvl-btn .form-fields').append(`

                <label title="${$(this).text()}" class="spell-lvl-btn__label" for="${appId}lvl-btn-${i}">
                    <input type="radio" id="${appId}lvl-btn-${i}" name="lvl-btn" value="${value}">
                    <div class="spell-lvl-btn__btn">${i}</div>
                    ${availableSlotsBadge}
                </label>

            `);
        });

        // Click on the button corresponding to the default value on the cast level dropdown menu
        $(options._element[0]).find(`#${appId}lvl-btn-${selectedLevel}`).trigger('click');

        // Change the dropdown menu value when user clicks on a button
        $(options._element[0]).find('.spell-lvl-btn__label').on('click', function() {
            levelSelectWrapper.find('select').val( $(this).find('input').val() );
        });

    }
}
});