import ListHeader from "./ListHeader";
import ContentAddCircleIcon from "material-ui/svg-icons/content/add-circle";
import ActionSearch from "material-ui/svg-icons/action/search";
import EditorModeEdit from "material-ui/svg-icons/editor/mode-edit";
import EditorFormatListBulleted from "material-ui/svg-icons/editor/format-list-bulleted";

const TAKE = 20;

export default class index extends PageComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
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
    this.searchQuery = this.typingQuery;
    let options = this.getOptions();
    options = update(options, {$merge: {
      search_query: this.searchQuery,
      take: TAKE,
    }})
    this.apiGetList(options);
    this.setState({error: ""})
  }

  apiGetList(options) {
    API[this.apiName].getList(this.handleGetList, options);
  }

  getOptions() {
  }

  getAdditionDataForChildren() {
    return;
  }

  handleGetList = (status, data) => {
    if (!status) return;
    this.setState({
      data: data.singers,
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
    this.refs.objectForm.open();
  }

  handleClickDetail = (data) => {
    this.refs.objectDetail.open(data);
  }

  handleClickEdit = (data) => {
    this.refs.objectForm.open(data);
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
            <span>{t("common.attributes.no")}</span>
          </div>
          <div className="col-xs-1 header-title td">
            <span>{t("common.attributes.image")}</span>
          </div>
          {
            this.fields.map((field) => {
              return (
                <div
                  className={`col-xs-${field.width} header-title td custom-${field.name}`}
                  key={field.name}>
                    <span>{t(`common.attributes.${field.name}`,
                      {fallback: t(`${this.transPath}.attributes.${field.name}`)})}</span>
                </div>
              );
            })
          }
          <div className="col-xs-2 header-title td">
            <span>{t("common.attributes.created_at")}</span>
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
      this.state.data.map((item, index) => {
        return (
          <div
            className={(this.isShowHoverPointer ? "pointer" : "") + " row table-row table-row-striped-2"}
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
    let dataRow = this.fields.map((field) => {
      let text = field.transform ? field.transform(item) : item[field.name];
      return (
        <div className={`col-xs-${field.width} td ellipsis-text custom-${field.name}`} key={field.name}
          title={text}>
          <span>{text}</span>
        </div>
      );
    });
    const defaultImg = "/images/default-playlist.jpg";
    const avatar = item.attachments[0] ? item.attachments[0].url : defaultImg

    return (
      <div>
        <div className="col-xs-1 td ellipsis-text"
          title={item.id}>
          <span>{index + 1}</span>
        </div>
        <div className="col-xs-1 td">
          <mui.Avatar src={avatar} size={40} className="avatar"/>
        </div>
        {dataRow}
        <div className="col-xs-2 td"
          title={item.created_at}>
          <span>{item.created_at}</span>
        </div>
      </div>
    )
  }

  renderItemButtonGroup(item) {
    return (
      <div className={`col-xs-${this.child ? 3 : 2} td btn-group`}>
        <cm.RaisedButton
          className="btn-edit btn-mr5"
          label={t("common.edit")}
          primary={true}
          icon={<EditorModeEdit />}
          onClick={() => this.handleClickEdit(item)} />
        {this.renderAdditionRowButton(item)}
      </div>
    );
  }

  renderAdditionRowButton(item) {
    if (this.child) {
      return (
        <cm.RaisedButton
          className="addition-btn"
          label={t(`${this.transPath}.child`)}
          secondary={true}
          icon={<EditorFormatListBulleted />}
          onTouchTap={(event) => this.handleShowChildren(item)} />
      );
    }
  }

  handleShowChildren = (data) => {
    this.refs.objectChild.open(data, this.getAdditionDataForChildren());
  }

  renderAdditionDialogs() {
    if (this.child) {
      return <this.child.dialog ref="objectChild" />;
    }
  }

  renderDialogs() {
    return (
      <div>
        <this.objectDetail
          ref="objectDetail"
          parent={this.parent}
        />
        <this.objectForm
          ref="objectForm"
          parent={this.parent}
          onSubmit={this.handleSearch}
        />
        {this.renderAdditionDialogs()}
      </div>
    );
  }

  renderHeader() {
    let icon = <i className="material-icons icon-header">account_circle</i>;
    return (
      <ListHeader
        icon={icon}
        title="Singers"
      >
        {this.renderActionHeader()}
      </ListHeader>
    )
  }

  render() {
    return (
      <div className="singer-index">
        {this.renderHeader()}
        {this.state.data ?
          <div className="body-index">
            {this.state.data.length ?
              this.renderTable(this.renderListElement()) :
              <div className="no-record">Have no record!</div>}
          </div> : null
        }
        {this.renderDialogs()}
      </div>
    );
  }
}
