import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Popup = props => {
  return (
    <div class="popup-box">
          <div class="box">
            <span class="close-icon" onClick={props.handleClose}><FontAwesomeIcon icon={faClose} size="1x"/></span>
            <div class="boxcontent">
                {props.content} 
            </div>
      </div>
    </div>
  );
};
 
export default Popup;