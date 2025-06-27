// Menu data management
class MenuManager {
    constructor() {
        this.menuData = null;
        this.init();
    }

    async init() {
        await this.loadMenuData();
        this.renderMenu();
    }

    async loadMenuData() {
        try {
            const response = await fetch('../data/data.json');
            this.menuData = await response.json();
        } catch (error) {
            console.error('Error loading menu data:', error);
        }
    }

    renderMenu() {
        if (!this.menuData) return;

        this.renderMostPopular();
        this.renderSignatureCoffee();
        this.renderHotDrinks();
        this.renderPastry();
        this.renderModals();
    }

    renderMostPopular() {
        const container = document.getElementById('mostPopularContainer');
        if (!container) return;

        const items = this.menuData.menu.mostPopular;
        container.innerHTML = items.map(item => this.createMenuItemHTML(item)).join('');
    }

    renderSignatureCoffee() {
        const container = document.getElementById('signatureCoffeeContainer');
        if (!container) return;

        const items = this.menuData.menu.signatureCoffee;
        container.innerHTML = items.map(item => this.createMenuItemHTML(item)).join('');
    }

    renderHotDrinks() {
        const container = document.getElementById('hotDrinksContainer');
        if (!container) return;

        const items = this.menuData.menu.hotDrinks;
        container.innerHTML = items.map(item => this.createMenuItemHTML(item)).join('');
    }

    renderPastry() {
        const container = document.getElementById('pastryContainer');
        if (!container) return;

        const items = this.menuData.menu.pastry;
        container.innerHTML = items.map(item => this.createMenuItemHTML(item)).join('');
    }

    createMenuItemHTML(item) {
        return `
            <div class="card1 col-12 col-md-6" data-bs-toggle="modal" data-bs-target="#modal${item.id}">
                <div class="py-3 border-bottom">
                    <div class="row">
                        <div class="col-3 align-self-center">
                            <div class="ratio ratio-1x1">
                                <img class="object-fit-cover" src="${item.image}" alt="${item.name}">
                            </div>
                        </div>
                        <div class="col-7">
                            <h5 class="mb-2">${item.name}</h5>
                            <p class="mb-0">${item.description}</p>
                        </div>
                        <div class="col-2">
                            <div class="fs-6 text-center text-black">
                                ${item.price}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    renderModals() {
        const modalContainer = document.getElementById('modalContainer');
        if (!modalContainer) return;

        const allItems = [
            ...this.menuData.menu.mostPopular,
            ...this.menuData.menu.signatureCoffee,
            ...this.menuData.menu.hotDrinks,
            ...this.menuData.menu.pastry
        ];

        modalContainer.innerHTML = allItems.map(item => this.createModalHTML(item)).join('');
    }

    createModalHTML(item) {
        const sizeOptions = item.sizes && item.sizes.length > 0 ? `
            <div class="mb-2">
                ${item.sizes.map((size, index) => `
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="size${item.id}" id="size${item.id}_${index}" ${index === 1 ? 'checked' : ''}>
                        <label class="form-check-label" for="size${item.id}_${index}">
                            <p class="ms-2">${size}</p>
                        </label>
                    </div>
                `).join('')}
            </div>
        ` : '';

        return `
            <div class="modal fade" id="modal${item.id}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
                aria-labelledby="modalLabel${item.id}" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="modalLabel${item.id}">${item.name}</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <img src="${item.image}" class="w-100" alt="${item.name}">
                            <p>${item.fullDescription}</p>
                            ${sizeOptions}
                            <div class="mb-3">
                                <label for="instructions${item.id}" class="form-label">
                                    <h5>Special instructions</h5>
                                    Any specific preferences? Let the restaurant know.
                                </label>
                                <input type="text" class="form-control" id="instructions${item.id}" placeholder="e.g No mayo">
                            </div>
                            <div class="mb-3">
                                <label for="feedback${item.id}" class="form-label">Another Feedback</label>
                                <input type="text" class="form-control" id="feedback${item.id}" placeholder="Another input placeholder">
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" class="btn btn-warning">Add</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new MenuManager();
});
