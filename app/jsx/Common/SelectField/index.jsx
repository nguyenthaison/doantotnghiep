export default class SelectField extends BaseComponent {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value && (
      this.props.items !== nextProps.items
      || this.props.filterKey !== nextProps.filterKey
      || this.props.filterValue !== nextProps.filterValue
    )) {
      let items = nextProps.items || [];
      let filterItems = items.filter((item) =>
        item.id === nextProps.value && item[nextProps.filterKey] === nextProps.filterValue);

      if (!filterItems.length) {
        nextProps.onChange(null, null, null);
      }
    }
  }

  renderLabel = (fieldName, required = false) => {
    let requiredText = required ? <span className="required">{t("common.required")}</span> : "";

    return(
      <label className="small-label">
        {fieldName}
        {requiredText}
      </label>
    );
  }

  render() {
    let props = this.props;
    let filteredProps = {};
    let extendedProps = ["fieldName", "required", "items", "filterKey", "filterValue", "withBlankItem"];

    Object.keys(this.props).map((k) => {
      if (extendedProps.indexOf(k) < 0) {
        filteredProps[k] = this.props[k];
      }
    });

    let items = props.items || [];
    let filteredItems = !props.filterKey ? items : items.filter(
      (item) => item[this.props.filterKey] === this.props.filterValue);

    let menuItems = filteredItems.map((item) => {
      return <mui.MenuItem key={item.id} value={item.id} primaryText={item.name} />
    });

    if (props.withBlankItem) {
      menuItems.unshift(<mui.MenuItem key={0} value={null} primaryText={<span>&nbsp;</span>} />);
    }

    return (
      <div className="common-selectfield">
        {this.renderLabel(props.fieldName, props.required)}
        <mui.SelectField
          labelStyle={{
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            top: "-5px",
            height: "36px"}}
          {...filteredProps}>
          {menuItems}
        </mui.SelectField>
      </div>
    );
  }
}
