import SingerDetail from "./SingerDetail";
import SingerForm from "./SingerForm";
import MasterIndex from "../MasterIndex";

export default class index extends MasterIndex {
  constructor(props) {
    super(props);

    this.objectDetail = SingerDetail;
    this.objectForm = SingerForm;
    this.apiName = "Singer";
  }

  getOptions() {
    let include = {
      country: {},
      attachments: {},
      background_attachments: {},
    }
    return {
      include: JSON.stringify(include),
    }
  }

  handleGetList = (status, data) => {
    if (!status) return;
    this.setState({
      data: data.singers,
    })
  }
}
