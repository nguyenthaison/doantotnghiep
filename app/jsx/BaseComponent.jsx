class BaseComponent extends React.Component {
  constructor(props) {
    super(props);
    this.params = props.params;
  }

  shouldComponentUpdate(nextProps, nextState) {
    let shouldUpdate = false;

    if (this.state !== nextState) {
      shouldUpdate = true;
    } else if (this.props !== nextProps) {
      for (let prop of Object.keys(this.props)) {
        if (this.props[prop] !== nextProps[prop]
          && typeof this.props[prop] !== "function") {
          shouldUpdate = true;
          break;
        }
      }
    }

    return shouldUpdate;
  }

  filterObjectKeys(keys, original) {
    let newObj = {};
    keys.map((key) => {
      if (original.hasOwnProperty(key)) {
        newObj[key] = original[key];
      }
    });
    return newObj;
  }
}

module.exports = BaseComponent;
