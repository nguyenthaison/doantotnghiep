import ListHeader from "./ListHeader";
import {Link} from "react-router";
import ContentAddCircleIcon from "material-ui/svg-icons/content/add-circle";
import ActionSearch from "material-ui/svg-icons/action/search";
import ActionSupervisorAccount from "material-ui/svg-icons/action/supervisor-account";
import EditorModeEdit from "material-ui/svg-icons/editor/mode-edit";
import EditorFormatListBulleted from "material-ui/svg-icons/editor/format-list-bulleted";
import {SortableContainer, SortableElement, arrayMove} from "react-sortable-hoc";

const takeRecord = 20;

export default class List extends PageComponent {
  constructor(props) {
    super(props);

    this.state = {
      list: [],
      error: "",
      sorting: false,
      hasMore: false,
    }
    this.typingQuery = "";
    this.searchQuery = "";
    this.take = takeRecord;
    this.isShowHoverPointer = true;
  }

  componentDidMount() {
    this.setToolBar(t(`${this.transPath}.header_title`));
    this.getListMaster(takeRecord);
  }

  getOptions() {
    return {};
  }

  getListMaster(take) {
    this.searchQuery = this.typingQuery;
    let options = this.getOptions();
    let include = update(options["include"] || {}, {$merge: {
      creator: {only: ["name"]},
      updater: {only: ["name"]},
    }});

    options = update(options, {$merge: {
      search_query: this.searchQuery,
      take: take,
      include: JSON.stringify(include),
    }})

    API[this.apiName].getList(this.handleGetDataListCallback, options);
    this.setState({error: ""})
  }

  handleGetDataListCallback = (status, data) => {
    if (!status) return;

    this.setState({
      list: data[this.tableName],
      hasMore: data["has_more"],
    });
  }

  handleSearch = () => {
    this.take = takeRecord;
    this.getListMaster(takeRecord);
  }

  handleChangeTextSearch = (event) => {
    this.typingQuery = event.target.value;
  }

  handleKeyDownSearch = (event) => {
    if (event.keyCode === 13) {
      this.handleSearch();
    }
  }

  handleClickDetail = (data) => {
    this.refs.objectDetail.open(data);
  }

  handleClickCreate = () => {
    this.refs.objectForm.open();
  }

  handleClickEdit = (data) => {
    this.refs.objectForm.open(data);
  }

  handleClickSort = () => {
    let sorting = !this.state.sorting;

    this.setState({
      sorting: sorting,
    });
  }

  handleClickLoadMore = () => {
    this.take += takeRecord;
    this.getListMaster(this.take);
  }

  getAdditionDataForChildren() {
    return;
  }

  handleShowChildren = (data) => {
    this.refs.objectChild.open(data, this.getAdditionDataForChildren());
  }

  onSortEnd = ({oldIndex, newIndex}) => {
    let list = this.state.list;
    if (oldIndex !== newIndex) {
      list[oldIndex].order_number = list[newIndex].order_number;
      if (oldIndex < newIndex) {
        for (let i = newIndex; i > oldIndex; i--) {
          list[i].order_number++;
        }
      } else {
        for (let i = newIndex; i < oldIndex; i++) {
          list[i].order_number--;
        }
      }
    }

    list = arrayMove(list, oldIndex, newIndex)
    this.setState({list: list});

    let orderData = {};
    list.map((item) => {
      orderData[item.id] = {order_number: item.order_number};
    });

    API[this.apiName].batchUpdate(() => {}, orderData)
  };

  renderTable(listElement) {
    return (
      <div>
        <div className="row table-header table-row">
          <div className="col-xs-1 header-title td">
            <span style={{color: theme.secondaryColor}}>{t("common.attributes.id")}</span>
          </div>
          {
            this.fields.map((field) => {
              return (
                <div
                  className={`col-xs-${field.width} header-title td custom-${field.name}`}
                  key={field.name}>
                    <span style={{color: theme.secondaryColor}}>{t(`common.attributes.${field.name}`,
                      {fallback: t(`${this.transPath}.attributes.${field.name}`)})}</span>
                </div>
              );
            })
          }
          <div className="col-xs-2 header-title td">
            <span style={{color: theme.secondaryColor}}>{t("common.attributes.updated_at")}</span>
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
        </div>
      </div>
    )
  }

  renderAdditionDialogs() {
    if (this.child) {
      return <this.child.dialog ref="objectChild" />;
    }
  }

  renderDataRow(item) {
    let dataRow = this.fields.map((field) => {
      let text = field.transform ? field.transform(item) : item[field.name];
      return (
        <div className={`col-xs-${field.width} td ellipsis-text custom-${field.name}`} key={field.name}
          title={text}>
          <span>{text}</span>
        </div>
      );
    });

    return (
      <div>
        <div className="col-xs-1 td ellipsis-text"
          title={item.id}>
          <span>{item.id}</span>
        </div>
        {dataRow}
        <div className="col-xs-2 td"
          title={item.updated_at}>
          <span>{item.updated_at}</span>
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

  renderSortableList() {
    let list = this.state.list;
    const SortableItem = SortableElement(({item}) => {
      return (
        <div className={(this.isShowHoverPointer ? "pointer" : "") + " row table-row table-row-striped-2 sorted-row"}>
          {this.renderDataRow(item)}
        </div>
      );
    });

    const SortableList = SortableContainer(({items}) => {
      return (
        <div>
          {items.map((item, index) =>
            <SortableItem key={item.id} item={item} index={index} />
          )}
        </div>
      );
    });

    return (
      <div>
        <SortableList items={this.state.list} onSortEnd={this.onSortEnd} />
      </div>
    );
  }

  renderUnsortableList() {
    return (
      this.state.list.map((item) => {
        return (
          <div
            className={(this.isShowHoverPointer ? "pointer" : "") + " row table-row table-row-striped-2"}
            key={item.id}
            onClick={() => this.handleClickDetail(item)}>
            {this.renderDataRow(item)}
            {this.renderItemButtonGroup(item)}
          </div>
        );
      })
    )
  }

  renderListElement() {
    return this.state.sorting ? this.renderSortableList() : this.renderUnsortableList();
  }

  renderAdditionRowButton(item) {
    if (this.child) {
      return (
        <cm.RaisedButton
          className="addition-btn"
          label={t(`${this.transPath}.child`)}
          secondary={true}
          icon={<EditorFormatListBulleted />}
          buttonStyle={{backgroundColor: theme.primary1Color}}
          onTouchTap={(event) => this.handleShowChildren(item)} />
      );
    }
  }

  renderDialogs() {
    return (
      <div>
        <this.objectDetail
          ref="objectDetail"
          parent={this.parent}
          additionData={this.additionData}
          onShowChildren={this.handleShowChildren}
          child={this.child}
          transPath={this.transPath} />
        <this.objectForm
          ref="objectForm"
          parent={this.parent}
          additionData={this.additionData}
          transPath={this.transPath}
          onSubmit={this.handleSearch} />
        {this.renderAdditionDialogs()}
      </div>
    );
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
    let icon = this.iconHeader ?
      <i className="material-icons icon-header">{this.iconHeader}</i> : "";

    return (
      <div className="base-master-index">
        <ListHeader
          icon={icon}
          title={this.noHeaderTitle ? "" : t(`${this.transPath}.title`)}
          type={this.headerType}>
          {this.renderActionHeader()}
        </ListHeader>
        {this.state.list ?
          <div className="body-index">
            {this.state.list.length ?
              this.renderTable(this.renderListElement()) :
              <div className="no-record">{t("common.message.no_record")}</div>}
          </div> : null
        }
        {this.renderDialogs()}
      </div>
    );
  }
}
