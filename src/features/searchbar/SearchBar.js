import React, {useState} from "react";
import { addSearchTerm } from "./searchSlice";
import { useSelector, useDispatch } from "react-redux";
import { selectSearchTerm } from "./searchSlice";


export default function SearchBar() {

    const dispatch = useDispatch();
    const [searchTerm, setSearchTerm] = useState('');
    
    const handleSubmit = () => {
        
        dispatch(addSearchTerm(searchTerm));
    }

    const handleChange = (e) => {
        setSearchTerm(e.target.value);
    }

    return (
        <form
            onSubmit={handleSubmit}>
            <input 
                type='text'
                onChange={handleChange}
            />
            <input 
                type='submit'
                value='Search' 
            />
        </form>
    );
}