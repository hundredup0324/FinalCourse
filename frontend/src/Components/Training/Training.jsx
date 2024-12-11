import React from 'react'
import './Training.css'
import data_product from '../Assets/all_courses'
import Item from '../Item/Item'


const Training = () => {

    return (

        <div className='training'>
            <h1>List of Courses: </h1>
            <hr />
            <div className='training-item'>
                {data_product.map((item,i)=>{

                    return <Item key={i} id={item.id} name={item.name} image={item.image} concept={item.concept} />
                    
                })}
               



            </div>

        </div>
       
        
     )
    
}

export default Training