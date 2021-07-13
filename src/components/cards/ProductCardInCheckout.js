import React from 'react'

const ProductCardInCheckout = ({p}) => {
    return (
        <tbody>
            <tr>
                <td>Image</td>
                <td>{p.title}</td>
                {p.isCustomized ? (
                   <>
                    <td>
                        Left Power: {p.choosePowerLeft} <br />
                        Right Power: {p.choosePowerRight}
                    </td> 
                   </>
                ) : (
                    <td>{p.choosePower}</td>
                )}
                <td>{p.category.name}</td>
                <td>{p.count}</td>
                <td>{p.price}</td>
                <td>Delete Icon</td>
            </tr>
        </tbody>
    )
}

export default ProductCardInCheckout