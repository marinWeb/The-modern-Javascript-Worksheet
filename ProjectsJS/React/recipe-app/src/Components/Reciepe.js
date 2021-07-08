import style from '../recipe.module.css'

const Reciepe = ({title, calorie, image, ingredients}) =>{

    return(
        <div className={style.recipe}>
            <h1>{title}</h1>
            <p>{calorie}</p>
            <ul>
                {ingredients.map(ingredient =>(
                    <li key={ingredient.text+Math.floor(Math.random()*100)}>{ingredient.text}</li>
                ))}
            </ul>
            <img src={image} alt="" />

        </div>
    )
}

export default Reciepe;