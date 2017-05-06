import ListHeader from "../ListHeader";
import ContentAddCircleIcon from "material-ui/svg-icons/content/add-circle";
import ActionSearch from "material-ui/svg-icons/action/search";
import EditorModeEdit from "material-ui/svg-icons/editor/mode-edit";
import SingerDetail from "./SingerDetail";
import SingerForm from "./SingerForm";

const TAKE = 20;

export default class index extends PageComponent {
  constructor(props) {
    super(props);

    this.state = {
      singers: [],
      error: "",
      hasMore: false,
    }
    this.typingQuery = "";
    this.searchQuery = "";
    this.take = TAKE;
  }

  componentDidMount() {
    this.setToolBar("Admin Page");
    this.getListMaster();
  }

  getListMaster() {
    // this.searchQuery = this.typingQuery;
    let options = this.getOptions();
    // let include = update(options["include"] || {}, {$merge: {
    //   creator: {only: ["name"]},
    //   updater: {only: ["name"]},
    // }});

    // options = update(options, {$merge: {
    //   search_query: this.searchQuery,
    //   take: take,
    //   include: JSON.stringify(include),
    // }})

    // API[this.apiName].getList(this.handleGetDataListCallback, options);
    // this.setState({error: ""})
    API.Singer.getList(this.handleGetList, options);
  }

  getOptions() {
    let include = {
      country: {},
    }
    return {
      include: JSON.stringify(include),
    }
  }

  handleGetList = (status, data) => {
    if (!status) return;
    this.setState({
      singers: data.singers,
    })
  }

  handleKeyDownSearch = (event) => {
    if (event.keyCode === 13) {
      this.handleSearch();
    }
  }

  handleSearch = () => {
    this.take = TAKE;
    this.getListMaster(TAKE);
  }

  handleChangeTextSearch = (event) => {
    this.typingQuery = event.target.value;
  }

  handleClickCreate = () => {
    this.refs.singerForm.open();
  }

  handleClickDetail = (data) => {
    this.refs.singerDetail.open(data);
  }

  handleClickEdit = (data) => {
    this.refs.singerForm.open(data);
  }

  handleClickLoadMore = () => {
    this.take += TAKE;
    this.getListMaster(this.take);
  }

  renderActionHeader() {
    return (
      <div>
        <mui.TextField className="input-search"
          hintText={t("common.search")}
          onKeyDown={this.handleKeyDownSearch}
          onChange={(event) => this.handleChangeTextSearch(event)}/>
          <mui.IconButton className="icon-search" onClick={this.handleSearch}>
            <ActionSearch />
          </mui.IconButton>
          <cm.RaisedButton
            className="btn-create"
            label={t("common.create")}
            secondary={true}
            onTouchTap={this.handleClickCreate}
            icon={<ContentAddCircleIcon />}
          />
      </div>
    );
  }

  renderTable(listElement) {
    return (
      <div>
        <div className="row table-header table-row">
          <div className="col-xs-1 header-title td">
            <span>{t("common.no")}</span>
          </div>
          <div className="col-xs-1 header-title td">
            <span>{t("common.image")}</span>
          </div>
          <div className="col-xs-2 header-title td">
            <span>{t("common.attributes.name")}</span>
          </div>
          <div className="col-xs-1 header-title td">
            <span>{t("common.attributes.age")}</span>
          </div>
          <div className="col-xs-2 header-title td">
            <span>{t("common.attributes.country")}</span>
          </div>
          <div className="col-xs-2 header-title td">
            <span>{t("common.attributes.updated_at")}</span>
          </div>
        </div>
        <div className="table-index">
          {listElement}
          {this.state.hasMore ?
            <div className="btn-show-more">
              <cm.RaisedButton
                label={t("common.show_more")}
                onTouchTap={this.handleClickLoadMore}
                backgroundColor="lightgray"
                style={{
                  width: "90%",
                }}
                labelStyle={{
                  fontWeight: "bold",
                }}
              />
            </div> : null}
        </div>
      </div>
    )
  }

  renderListElement() {
    return (
      this.state.singers.map((item, index) => {
        return (
          <div
            className={"pointer row table-row table-row-striped-2"}
            key={item.id}
            onClick={() => this.handleClickDetail(item)}>
            {this.renderDataRow(item, index)}
            {this.renderItemButtonGroup(item)}
          </div>
        );
      })
    )
  }

  renderDataRow(item, index) {
    let image = "/images/p9.jpg";
    return (
      <div>
        <div className="col-xs-1 td ellipsis-text"
          title={index + 1}>
          <span>{index + 1}</span>
        </div>
        <div className="col-xs-1 td">
          <mui.Avatar src={image} size={40} className="avatar"/>
        </div>
        <div className="col-xs-2 td"
          title={item.name}>
          <span>{item.name}</span>
        </div>
        <div className="col-xs-1 td"
          title={item.age}>
          <span>{item.age}</span>
        </div>
        <div className="col-xs-2 td"
          title={item.country.full_name}>
          <span>{item.country.full_name}</span>
        </div>
        <div className="col-xs-3 td"
          title={item.updated_at}>
          <span>{item.updated_at}</span>
        </div>
      </div>
    )
  }

  renderItemButtonGroup(item) {
    return (
      <div className={`col-xs-2 td btn-group`}>
        <cm.RaisedButton
          className="btn-edit btn-mt"
          label={t("common.edit")}
          primary={true}
          icon={<EditorModeEdit />}
          onClick={() => this.handleClickEdit(item)} />
      </div>
    );
  }

  renderDialogs() {
    return (
      <div>
        <SingerDetail
          ref="singerDetail"
        />
        <SingerForm
          ref="singerForm"
          onSubmit={this.handleSearch}
        />
      </div>
    );
  }

  render() {
    let icon = <i className="material-icons icon-header">account_circle</i>;

    return (
      <div className="singer-index">
        <ListHeader
          icon={icon}
          title="Singers"
        >
          {this.renderActionHeader()}
        </ListHeader>
        {this.state.singers ?
          <div className="body-index">
            {this.state.singers.length ?
              this.renderTable(this.renderListElement()) :
              <div className="no-record">Have no record!</div>}
          </div> : null
        }
        {this.renderDialogs()}
      </div>
    );
  }
}
