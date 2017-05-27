import SingerDetail from "./SingerDetail";
import SingerForm from "./SingerForm";
import MasterIndex from "../MasterIndex";

export default class index extends MasterIndex {
  constructor(props) {
    super(props);

    this.objectDetail = SingerDetail;
    this.objectForm = SingerForm;
    this.apiName = "Singer";
    this.transPath = "singers";

    this.fields = [
      {name: "name", width: 3},
      {name: "age", width: 1},
      {name: "country", width: 2, transform: (item) => {return item.country.full_name}},
    ];
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
}
