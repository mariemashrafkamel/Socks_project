Vue.config.devtools = true;
Vue.component('product-review', {
    template: `
    <form class="review-form" @submit.prevent="onSubmit">
    <p>
    <label for="name">Name: </label>
    <input id="name" v-model="name">
    </p>
    <p>
    <label for="review">Review: </label>
    <textarea id="review" v-model="review"></textarea>
    </p>
    <p>
    <label for="rating">Rating: </label>
    <select id="rating" v-model.number="rating">
    <option>5</option>
    <option>4</option>
    <option>3</option>
    <option>2</option>
    <option>1</option>
    </select>
    </p>
    <p>
    <input type="submit" value="Submit">
    </p>
    </form>
    `,
    data() {
        return {

            name: null,
            review: null,
            rating: null,
        }
    },
})
Vue.component('product-details', {
    props: {
        details: {
            type: Array,
            required: true,
        }
    },
    template: `
    <ul>
    <li v-for="detail in details">{{ detail }}</li>
</ul>
    `,
})
Vue.component('product', {
    props: {
        premium: {
            type: Boolean,
            required: true,
        }

    },
    template: `
    <div class="product">
    <div class="product-image">
        <img v-bind:src="image" :alt="altText">
    </div>
    <div class="product-info">
        <h1> {{ title }} </h1>
        <a :href="link" target="_blank">More products like this</a>
        <p v-if="inStock">In Stock</p>
        <p v-else :class="{ outOfStock: !inStock }">out of stock</p>
        <p>{{ sale }}</p>
        <p v-if="premium">User Is Premium: {{ premium }}</p>
        <p>Shipping: {{ shipping }}</p>
        
        <p>Colors:</p>
        <ul>
            <li v-for="(variant,index) in variants" :key="variant.variantId" class="color-box" v-bind:style="{ backgroundColor:variant.variantColor } " @mouseover="updateProduct(index) ">
            </li>
        </ul>
        <p>available sizes:</p>
        <ul>
            <li v-for=" size in sizes "> {{ size }}</li>
        </ul>
        <button v-on:click="addToCart " :disabled="!inStock" :class="{ disabledButton: !inStock }">Add to Cart</button>
        <button v-on:click="removeFromCart ">Remove From Cart</button>
        
    </div>
    <product-review></product-review>
</div>
    `,
    data() {
        return {
            brand: 'Nike',
            product: 'Socks',
            altText: 'pair of Socks',
            onSale: true,
            link: 'https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=socks',
            //image: 'green.jpg',
            selectedVariant: 0,
            //inStock: false,
            //sale: true,
            details: ["80% cotton", "20% polyester", "Gender-neutral"],
            variants: [{
                    variantId: 2234,
                    variantColor: "green",
                    variantImage: "green.jpg",
                    variantQuantity: 10,
                },
                {
                    variantId: 2235,
                    variantColor: "blue",
                    variantImage: "blue.jpg",
                    variantQuantity: 0,
                }
            ],
            sizes: ["S", "L", "XL"],

        }
    },
    methods: {
        addToCart: function() {
            //this.cart += 1;
            this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId);
        },
        removeFromCart: function() {
            //this.cart -= 1;
            this.$emit('remove-from-cart', this.variants[this.selectedVariant].variantId);
        },
        updateProduct: function(index) {
            this.selectedVariant = index;
            console.log(index);
        }
    },
    computed: {
        title() {
            return this.brand + ' ' + this.product
        },
        image() {
            return this.variants[this.selectedVariant].variantImage
        },
        inStock() {
            return this.variants[this.selectedVariant].variantQuantity
        },
        sale() {
            if (this.onSale) {
                return this.brand + ' ' + this.product + 'are on sale!'
            }
            return this.brand + ' ' + this.product + 'are not on sale!'
        },
        shipping() {
            if (this.premium) {
                return "Free";
            }
            return "3 $";
        },

    }
})
var app = new Vue({
    //new vue instance
    el: '#app',
    data: {
        premium: false,
        cart: [],
    },
    methods: {
        updateCart(id) {
            this.cart.push(id);
        },
        removeCart(id) {
            this.cart.pop(id);
        }
    },

})