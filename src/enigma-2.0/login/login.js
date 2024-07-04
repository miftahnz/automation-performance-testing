export class LoginPage {
    constructor(page) {
        this.page = page;
        this.usernameField = page.locator("[id='txt_username']");
        this.passwordField = page.locator("[id='txt_password']");
        this.submitButton = page.locator('[type="submit"]');
        this.verificationName = page.locator('body > ngx-app > ngx-pages > ngx-one-column-layout > nb-layout > div > div > div > div > div > nb-layout-column > ngx-home > div > div > div > nb-card:nth-child(1) > nb-card-header');

    }
    
    async goto() {
        const url = 'https://dev.enigmacamp.com/apps/portal/backoffice/#/auth/login';
        await this.page.goto(url);
    }

    async submitForm() {
        this.usernameField.type(__ENV.USERNAME_ADMIN);
        this.passwordField.type(__ENV.PASSWORD);
        await this.submitButton.click();
        await this.page.waitForNavigation();
    }

    getVerificationName(){
        return this.verificationName.textContent();
    }
}
