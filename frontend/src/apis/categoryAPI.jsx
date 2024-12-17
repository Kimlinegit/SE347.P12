
import {useState, useEffect} from 'react'
import axios from 'axios'

function CategoryAPI() {
    const [categories, setCategories] = useState([]);
    const [isUpdateCategory, setIsUpdateCategory] = useState(false);
    const token = localStorage.getItem('token');

    useEffect(() =>{
        getAllCategory(); 
        setIsUpdateCategory(false)
    },[isUpdateCategory])


    const getAllCategory = async () => {
        try {
            const res = await axios.get("/api/categories");
            setCategories(res.data.categories);
        } catch (err) {
            console.log(err.message);
        }
    }


    const createCategory = async (categoryData) => {
        if(token){
            try {
                const res = await axios.post("/api/categories/create", categoryData, {
                    headers: {Authorization: token}
                })
                alert(res.data.message);
                setIsUpdateCategory(true);
            } catch (err) {
                alert(err.response.data.message);
            }
        }
    }

    const updateCategory = async (categoryData, categoryId) => {
        if(token){
            try {
                const res = await axios.put(`/api/categories/${categoryId}`, categoryData, {
                    headers: {Authorization: token}
                })
                alert(res.data.message);
                setIsUpdateCategory(!isUpdateCategory);
            } catch (err) {
                alert(err.response.data.message);
            }
        }
    }


    const deleteCategory = async (categoryId) => {
        if(token){
            try {
                const res = await axios.delete(`/api/categories/${categoryId}`, {
                    headers: {Authorization: token}
                })
                alert(res.data.message);
                setIsUpdateCategory(!isUpdateCategory);
            } catch (err) {
                console.log(err.message)
            }
        }
    }

    
    return {
        categories: [categories, setCategories],
        createCategory: createCategory,
        updateCategory: updateCategory,
        deleteCategory: deleteCategory,
        getAllCategory: getAllCategory
    }
}

export default CategoryAPI


