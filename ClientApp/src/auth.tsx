class Auth {
    public url = "/token";

    public signIn(username: string, password: string) {
        return fetch(this.url, {
            body: "username=" + username + "&password=" + password + "&grant_type=password&client_id=dotnetifydemo",
            method: "post",
            mode: "no-cors",
            headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" }
        })
            .then(response => {
                if (!response.ok) { throw new Error(response.status.toString()); }
                return response.json();
            })
            .then(token => {
                window.localStorage.setItem("access_token", token.access_token);
            });
    }

    public signOut() {
        window.localStorage.removeItem("access_token");
        window.location.href = "/";
    }

    public getAccessToken() {
        return window.localStorage.getItem("access_token");
    }

    public hasAccessToken() {
        return this.getAccessToken() != null;
    }
}

export default new Auth();
