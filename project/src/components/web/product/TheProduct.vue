<template>
    <!-- <div class="product">
        <div class="wrapper-product">
            <div class="header-product">ten san pham</div>
            <div class="content-product"></div>
            <div class="footer-product"></div>
        </div>
    </div> -->
    <div v-for="(item, index) in productsItem" :key="index" class="card">
			<span class="like"><i class='bx bx-heart'></i></span>
			<span class="cart"><i class='bx bx-cart-alt' ></i></span>
			<div class="card__img">
				<img :src="item.src" alt="thumb" />
			</div>
			<h2 class="card__title">{{ item.name }}</h2>
			<p class="card__price">{{ item.price }}</p>
			<div class="card__size">
				<h3>{{ item.size }}</h3>
				<span>6</span>
				<span>7</span>
				<span>8</span>
				<span>9</span>
			</div>
			<div class="card__color">
				<h3>Color:</h3>
				<span class="green">xanh</span>
				<span class="red">đỏ</span>
				<span class="black">đen</span>
			</div>
			<div class="card__action">
				<button>Buy now</button>
				<button>Add cart</button>
			</div>
		</div>
    
</template>

<script>
export default {
    name:"TheProduct",
    setup(){
        const productsItem = [
            {
                src: require('../../../assets/images/shoe/Nike12.png'),
                name: 'Nike Zoom KD 12',
                price: '100,000',
                size: 'Kích cỡ',
            },
			{
                src: require('../../../assets/images/shoe/Nike12.png'),
                name: 'Nike Zoom KD 13',
                price: '99,000',
                size: 'Kích cỡ',
            },
        ];
        return {
            productsItem
        };
    }
}
</script>

<style>
@import url(../../../../node_modules/boxicons/css/boxicons.min.css);
:root {
	--primary-color: #4daf54;
}

* {
	padding: 0;
	margin: 0;
	box-sizing: border-box;
}

body {
	overflow: hidden;
	height: 200vh;
	scroll-behavior: smooth;
}

.card {
	margin: 16px;
	width: 320px;
	height: 400px;
	background-color: #272d40;
	border-radius: 15px;
	padding: 40px 20px;
	color: white;
	position: relative;
}

.card__img {
	width: 90%;
	transition: 0.5s;
}

img {
	width: 100%;
	height: 100%;
	object-fit: cover;
	object-position: center;
}

.card:hover .card__img {
	transform: translateY(-90px) rotate(-20deg);
}

.card__title {
	color: var(--primary-color);
	transition: 0.5s;
	text-align: center;
}

.card__price {
	font-weight: 600;
	font-size: 26px;
	transition: 0.5s;
	text-align: center;
}

.card:hover .card__title {
	transform: translate(-40px, -72px);
}

.card:hover .card__price {
	transform: translate(-112px, -72px);
}

.card__size,
.card__color,
.card__action {
	opacity: 0;
	visibility: hidden;
	transition: 0.5s;
    display: flex;
    flex-direction: row;
    column-gap: 4px;
}

.card__size {
	margin-top: 100px;
}

.card:hover .card__size {
	margin-top: -30px;
}

.card:hover .card__size,
.card:hover .card__color,
.card:hover .card__action {
	transition-delay: 0.2s;
	opacity: 1;
	visibility: visible;
}
</style>