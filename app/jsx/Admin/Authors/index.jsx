import SingerIndex from "../Singers";

export default class index extends SingerIndex {
  apiGetList(options) {
    console.log("aaa");
    API.Author.getList(this.handleGetList, options);
  }

  handleGetList = (status, data) => {
    if (!status) return;
    this.setState({
      data: data.authors,
    })
  }
}
