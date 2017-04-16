﻿class CreateProductForm {
    constructor(isInEdit) {
        this._productTypeSelectlist = $('select');
        this._productNameTextbox = $('#Name');
        this._productPriceTextbox = $('#Price');
        this._pictureInput = $('#Picutre');
        this._previewProductNameContainer = $('.acp-product-name');
        this._previewProductIngredientsContainer = $('.acp-product-ingredients');
        this._pssPreviewContainer = $('#pss-preview-container');
        this._previewProductPrice = $('.product-price');
        this._drinkPreviewContainer = $('#drink-preview-container');
        this._addIngredientBtn = $('#add-ingredient-btn');
        this._addedIngredientsContainer = $('#added-ingredients');
        this._addedIngredients = [];
        this._isInEdit = isInEdit;

        this.attachEvents();
        this.attachRemoveIngredientEvents();

        if (!this._isInEdit) {
            this.setupSelectlist();
        }
    }

    attachEvents() {
        this._productTypeSelectlist.change((ev) => {
            let type = $(ev.currentTarget).find(":selected").text();

            if (type === 'Пици' || type === 'Сандвичи' || type === 'Салати') {
                this._pssPreviewContainer.show();
                this._drinkPreviewContainer.hide();
                ingredientsContainer.show();
            } else if (type === 'Напитки') {
                this._drinkPreviewContainer.show();
                this._pssPreviewContainer.hide();
                ingredientsContainer.hide();
            } else {
                this.drinkPreviewContainer.hide();
                this.pssPreviewContainer.hide();
                ingredientsContainer.hide();
            }
        });

        this._productNameTextbox.keyup((ev) => {
            let value = ev.currentTarget.value;
            this._previewProductNameContainer.text(value);
        });

        this._productPriceTextbox.keyup((ev) => {
            let value = Number(ev.currentTarget.value);

            if (!value && value !== 0) {
                return;
            }

            this._previewProductPrice.text(value.toFixed(2) + ' лв.');
        });

        this._addIngredientBtn.click((ev) => {
            let ingredientName = newIngredientNameTextbox.val().trim();

            if (!ingredientName) {
                return;
            }

            addedIngredientNames.push(ingredientName);
            this._previewProductIngredientsContainer.text(addedIngredientNames.join(', '));

            let ingredientToAdd = $(`<div class="added-ingredient-container" data-ingredient-num-val="${ingredinetCount}">
                            <input class="form-control
                                          ingredient-name-input"
                                          type="text"
                                          name="Ingredients[${ingredinetCount}].Name"
                                          value="${ingredientName}"
                                          readonly />
                            <span class="glyphicon glyphicon-remove remove-ingredient-btn"
                                         type="button"
                                         data-ingredient-name="${ingredientName}"></span></div>`);


            ingredientToAdd.find('.remove-ingredient-btn').click((ev) => {
                this.removeIngredient(ev);
            });

            addedIngredientsContainer.append(ingredientToAdd);

            newIngredientNameTextbox.val('');
            newIngredientNameTextbox.focus();
            ingredinetCount++;
        });
    }

    attachRemoveIngredientEvents() {
        $('.remove-ingredient-btn').click((ev) => {
            this.removeIngredient(ev);
        });
    }

    removeIngredient(ev) {
        let btn = $(ev.currentTarget);
        let ingredietnNameToRemove = btn.attr('data-ingredient-name');
        addedIngredientNames = addedIngredientNames.filter(x => x !== ingredietnNameToRemove);
        this._previewProductIngredientsContainer.text(addedIngredientNames.join(', '));

        let parent = btn.parent();
        parent.hide();
        parent.empty().append(`<input name="Ingredients[${parent.attr('data-ingredient-num-val')}]" value="" />`);
    }

    setupSelectlist() {
        this._productTypeSelectlist.prepend('<option value="-1" disabled></option>');
        this._productTypeSelectlist.val('-1');
    }
}