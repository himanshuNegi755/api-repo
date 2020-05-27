import 'whatwg-fetch';

class HttpService {
    getProducts = () => {
        var promise = new Promise((resolve, reject) => {
            fetch('http://localhost:5000/product')
            .then(response => {
                resolve(response.json());
        })    
    });
        
    return promise;        
    }
    
    getProductsWithType = (data) => {
        
        var promise = new Promise((resolve, reject) => {
            fetch(`http://localhost:5000/product/productType/${data}`)
            .then(response => {
                resolve(response.json());
            })
        });
        
        return promise;
    }
    
    getProductDetailsForProductPage = (data) => {
        var promise = new Promise((resolve, reject) => {
            fetch(`http://localhost:5000/product/product-details/${data}`)
            .then(response => {
                resolve(response.json());
            })
        });
        
        return promise;
    }
    
    getCart = () => {
        var promise = new Promise((resolve, reject) => {
            fetch('http://localhost:5000/cart')
            .then(response => {
                resolve(response.json());
        })    
    });
    
    return promise;
    }
    
    addToCart = (data) => {
        var promise = new Promise((resolve, reject) => {
            fetch('http://localhost:5000/cart/product/add', {
                method: 'PUT',
                body: JSON.stringify({
                    productId: data,
                    cartId: "5ea2ea234bedc110142194e1"
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                resolve(response.json());
            })
        });
        
        return promise;
    }
    
    deleteProductFromCart = (data) => {
        var promise = new Promise((resolve, reject) => {
            fetch('http://localhost:5000/cart/product/delete/', {
                method: 'PUT',
                body: JSON.stringify({
                    cartId: "5ea2ea234bedc110142194e1",
                    productId: data  
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                resolve(response.json());
            })
        });
        
        return promise;
    }
    
    createNewUser = (fullName, email, password) => {
        var promise = new Promise((resolve, reject) => {
            fetch('http://localhost:5000/new-user', {
                method: 'POST',
                body: JSON.stringify({
                    userName: fullName,
                    userEmail: email,
                    userPassword: password
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                resolve(response.json());
            })
        });
        
        return promise;
    }
    
    getCurrentUser = () => {
        var promise = new Promise((resolve, reject) => {
            fetch('http://localhost:5000/auth/current-user')
            .then(response => {
                resolve(response.json());
            })
        });
        
        return promise;
    }
}

export default HttpService;