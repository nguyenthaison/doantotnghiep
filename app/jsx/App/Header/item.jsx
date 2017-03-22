export default (props) => {
  return (
    <div className={`header-item ${props.className}`} onClick={props.onClick}>
      <i className="material-icons md-18 item">
        {props.icon}
      </i>
    </div>
  )
}
