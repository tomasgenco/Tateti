
export const Square = ({children, isSelected, updateBoard, index}) => { //Cada square ya sabe su indice, al inicilizarlo en base a eso
    const className = `square ${isSelected ? 'is-selected' : ''}`

    const handleClick = () => {
        updateBoard(index) //Al ya tener el square su indice, solo lo pasamos como parametro para editar esa posicion
    }
    return (
        <div className={className} onClick={handleClick}>
            {children}
        </div>
    )
}