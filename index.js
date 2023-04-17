import { getDistance } from 'geolib';
import {handleProducts} from "./api/products.js";
import {handleUsers} from "./api/users.js";
import {handleCarts} from "./api/carts.js";

const products = await handleProducts();
const users = await handleUsers();
const carts = await handleCarts();

const getCategoryTotalValue = () => {
    const categories = {};
    for (const product of products) {
        if (categories[product.category]) {
            categories[product.category].amount += product.price;
        } else {
            categories[product.category] = {
                category: product.category,
                amount: product.price,
            };
        }
    }
     return Object.values(categories).map((category) => {
         return {
             category: category.category,
             amount: Number(category.amount.toFixed(2))
         }
     })
}

const getMaxCart = () => {
    const reduceCart = [];
    let maxTotalPrice = 0;
    let maxCart = null;

    for(const cart of carts){
        let totalPrice = 0
        for (const product of cart.products){
            const foundProduct = products.find((item) => item.id === product.productId)
            const productPrice = foundProduct.price * product.quantity
            totalPrice += productPrice;
        }
        reduceCart.push({
            ...cart,
            totalPrice
        })
    }

    reduceCart.forEach((cart) => {
        if(cart.totalPrice > maxTotalPrice) {
            maxTotalPrice = cart.totalPrice;
            maxCart = cart;
        }
    })
    const foundUser = users.find((item) => item.id === maxCart.userId);
    const userData = {...foundUser.name}
    return{...userData,...maxCart}
}

const getFarthestUsers = () => {
    let maxDistance = 0;
    let farthestPoints = [];
    const usersPoints = users.map((user) => {
        const lat = user.address.geolocation.lat;
        const long = user.address.geolocation.long;
        return {
            id: user.id,
            latitude: lat,
            longitude: long
        }
    });

    for(let i = 0; i < usersPoints.length; i++) {
        for(let j = i + 1; j < usersPoints.length; j++) {
            const distance = getDistance({
                latitude: usersPoints[i].latitude,
                longitude: usersPoints[i].longitude
            },
                {
                    latitude: usersPoints[j].latitude,
                    longitude: usersPoints[j].longitude
                });
            if(distance > maxDistance) {
                maxDistance = distance;
                farthestPoints = [usersPoints[i], usersPoints[j]];
            }
        }
    }
    return farthestPoints
}

const categories = getCategoryTotalValue()
const maxCart = getMaxCart()
const farthestUsers = getFarthestUsers()

console.log(`Creates a data structure containing all available product categories and the total value of
products of a given category: `)
console.log(categories);

console.log(`Finds a cart with the highest value, determines its value and full name of its owner: `)
console.log(maxCart);

console.log(`Finds the two users living furthest away from each other`)
console.log(farthestUsers)






