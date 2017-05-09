import SongForm from "./SongForm";
import SongDetail from "./SongDetail";
import ListHeader from "../../ListHeader";
import ActionSearch from "material-ui/svg-icons/action/search";
import ContentAddCircleIcon from "material-ui/svg-icons/content/add-circle";
const TAKE = 20;

export default class index extends PageComponent {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
      list: [],
      error: "",
      sorting: false,
      hasMore: false,
    }
  }

  open = (data, additionData) => {
    this.setState({
      show: true,
    })
  }

  renderDialogs() {
    return (
      <div>
        <SongDetail ref="songDetail"/>
        <SongForm ref="songForm"/>
      </div>
    );
  }

  handleKeyDownSearch = (event) => {
    if (event.keyCode === 13) {
      this.handleSearch();
    }
  }

  handleSearch = () => {
    this.take = TAKE;
    // this.getListMaster(takeRecord);
  }

  handleChangeTextSearch = (event) => {
    this.typingQuery = event.target.value;
  }

  handleClickCreate = () => {
    // this.refs.objectForm.open();
  }

  handleClickDetail = (data) => {
    // this.refs.objectDetail.open(data);
  }

  renderTable(listElement) {
    return (
      <div>
        {/*<div className="row table-header table-row">
          <div className="col-xs-1 header-title td">
            <span>{t("common.attributes.id")}</span>
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
            <span>{t("common.attributes.updated_at")}</span>
          </div>
          <div className="col-xs-2 header-title td pull-right sort-button">
            {this.sortable ? (
              <cm.RaisedButton className={`pull-right ${this.state.sorting ? "sorting-button" : ""}`}
                label={this.state.sorting ? t("common.done") : t("master.sort")}
                onClick={this.handleClickSort}
                primary={true} />
            ) : ""}
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
        </div>*/}
      </div>
    )
  }

  renderDataRow(item) {
    return (
      <div></div>
    )
    // let dataRow = this.fields.map((field) => {
    //   let text = field.transform ? field.transform(item) : item[field.name];
    //   return (
    //     <div className={`col-xs-${field.width} td ellipsis-text custom-${field.name}`} key={field.name}
    //       title={text}>
    //       <span>{text}</span>
    //     </div>
    //   );
    // });

    // return (
    //   <div>
    //     <div className="col-xs-1 td ellipsis-text"
    //       title={item.id}>
    //       <span>{item.id}</span>
    //     </div>
    //     {dataRow}
    //     <div className="col-xs-2 td"
    //       title={item.updated_at}>
    //       <span>{item.updated_at}</span>
    //     </div>
    //   </div>
    // )
  }

  renderListElement() {
    return (
      this.state.list.map((item) => {
        return (
          <div
            className={(this.isShowHoverPointer ? "pointer" : "") + " row table-row table-row-striped-2"}
            key={item.id}
            onClick={() => this.handleClickDetail(item)}>
            {this.renderDataRow(item)}
            {/*this.renderItemButtonGroup(item)*/}
          </div>
        );
      })
    )
  }

  renderActionHeader() {
    if (this.noActionHeader) return;

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

  render() {
    const icon = <i className="material-icons icon-header">audiotrack</i>

    return (
      <div className="base-master-index">
        <cm.Dialog
          open={this.state.show}
        />
      </div>
    )
  }
}
