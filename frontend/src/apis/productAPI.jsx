
import {useState, useEffect} from 'react'
import axios from 'axios'


function ProductAPI() {
    const [products, setProducts] = useState([]);
    const [product, setProduct] = useState(null);
    const [category, setCategory] = useState('');
    const [sort, setSort] = useState('');
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [result, setResult] = useState(0);
    const [productUpdate, setProductUpdate] = useState(false);
    const [callback, setCallback] = useState(false);
    const [topSales, setTopSales] = useState([]);
    const token = localStorage.getItem('token');


    useEffect(() =>{
        getAllProducts(); 
        // setProductUpdate(fals);
        topSellingProducts(); 
    },[productUpdate, category, sort, search, page])


    const getAllProducts = async () => {
        try {
            // const res = await axios.get(`/api/products?limit=${page*9}&${category}&${sort}&name[regex]=${search}`)
            const res = await axios.get(`/api/products?limit=50&${category}&${sort}&name[regex]=${search}`);
            setProducts(res.data.products);
            setResult(res.data.result);
            // setProductUpdate(!productUpdate);
        } catch (err) {
            console.log(err.message);
        }
    }
   

    const topSellingProducts = async () => {
        try {
            const res = await axios.get("/api/products?sort=-sold")
            setTopSales(res.data.products);
        } catch (err) {
            console.log(err.message);
        }
    }


    const createProduct = async (productData) => {
        if(token){
            try {
                const res = await axios.post("/api/products/create", productData, {
                    headers: {Authorization: token}
                })
                console.log(res.data);
                alert(res.data.message);
                setProductUpdate(!productUpdate);
            } catch (err) {
                alert(err.response.data.message);
            }
        }
    };

    const createProductReview = async (productId, reviewData) => {
        try {
            const res = await axios.post(`/api/products/review/${productId}`, reviewData, {
                headers: {Authorization: token}
            })
            alert(res.data.message);
        } catch (error) {
            alert(error.response.data.message);
        }
    }

    const updateReview = async (productId, reviewData) => {
        try {
            const res = await axios.put(`/api/products/review/${productId}`, reviewData, {
                headers: {Authorization: token}
            });
            alert(res.data.message);
        } catch (error) {
            alert(error.response.data.message);
        }
    }

    const deleteReview = async (productId) => {
        try {
            const res = await axios.delete(`/api/products/review/${productId}`, {
                headers: {Authorization: token}
            });
            alert(res.data.message);
        } catch (error) {
            alert(error.response.data.message);
        }
    }

    const getDetailProduct = async (productId) => {
        try {
            const res = await axios.get(`/api/products/${productId}`)
            console.log(res.data);
            setProduct(res.data);
        } catch (err) {
            console.log(err.message);
        }
    }

    const updateProduct = async (productData, productId) => {
        if(token){
            try {
                const res = await axios.put(`/api/products/${productId}`, productData, {
                    headers: {Authorization: token}
                })
                alert(res.data.message);
                // setProductUpdate(true);
                setProductUpdate(!productUpdate);
            } catch (err) {
                console.log(err.message);
            }
        }
    }

    const deleteProduct = async (productId) => {
        if(token){
            try {
                const res = await axios.delete(`/api/products/${productId}`, {
                    headers: {Authorization: token}
                })
                alert(res.data.message);
                setProductUpdate(!productUpdate);
            } catch (err) {
                console.log(err.message);
            }
        }
    }

 

    return {
        products: [products, setProducts],
        product: [product, setProduct],
        topSales: [topSales, setTopSales],
        category: [category, setCategory],
        sort: [sort, setSort],
        search: [search, setSearch],
        page: [page, setPage],
        result: [result, setResult],
        productUpdate: [productUpdate, setProductUpdate],
        createProduct: createProduct,
        createProductReview: createProductReview,
        updateReview: updateReview,
        deleteReview: deleteReview,
        getAllProducts: getAllProducts,
        getDetailProduct: getDetailProduct,
        updateProduct: updateProduct,
        deleteProduct: deleteProduct
    }
}

export default ProductAPI
