
const Test = ({data, pageNumber, itemsPerPage}) => {
    const displayItems = data.slice(pageNumber * itemsPerPage, (pageNumber + 1) * itemsPerPage);

    return (
        <ul>
       {displayItems.map((item) => (
        <li key={item.id}>{item.title}</li>
       ))}
        </ul>
    );
};
export default Test;
