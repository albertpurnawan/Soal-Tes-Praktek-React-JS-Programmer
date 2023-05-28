import { useState } from "react";
import { Pagination } from "react-bootstrap";
const PaginationComp = ({ perpage, length, paginate }) => {
  const [active, setActive] = useState(0);
  let items = [];
   items.push(
     <Pagination.Item key={0} active={0 === active} onClick={() => { setActive(0); paginate('all') }}>
      ALL
    </Pagination.Item>,
    
  );
  for (let number = 1; number <= Math.ceil(length/perpage); number++) {
  items.push(
    <Pagination.Item key={number} active={number === active} onClick={() => { setActive(number); paginate(number) }}>
      {number}
    </Pagination.Item>,
    
  );
}
  return (
    <div class="pagination">
      <Pagination >
        {items}
      </Pagination>
    </div>
  );
};

export default PaginationComp;


