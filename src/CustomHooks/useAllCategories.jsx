import axios from 'axios';
import React from 'react'
import { useQuery } from 'react-query';

export default function useAllCategories() {
    function getAllCategories() {
        return axios.get("https://ecommerce.routemisr.com/api/v1/Categories");
      }
    
      const CategoriesData = useQuery({
        queryKey: "AllCategories",
        queryFn: getAllCategories,
      });

      return CategoriesData
}
