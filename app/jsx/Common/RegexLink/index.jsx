
export default class RegexLink extends BaseComponent {
  constructor(props) {
    super(props);
  }

  render() {
    let urlFileRegex = /(https?:\/\/[^\s]+)/g;
    let urlFolderRegex = t.getLocale() === "ja" ? /(資料集\/.+\))/g : /(TOP bookmark\/.+\))/g;

    let content = this.props.text.replace(urlFileRegex, (url) =>
      {
        return `<a href="${url}" target="_blank">${url}</a>`;
      });

    content = content.replace(urlFolderRegex, (data) =>
      {
        let reg = t.getLocale() === "ja" ? /(資料集\/.+\()(manual_files+\/\w+)/m :
          /(Manual File\/.+\()(manual_files+\/\w+)/m;
        let newData = data.match(reg);
        let title = newData[1].slice(0,-1);
        let link = newData[2];
        return `<a href="/${link}" target="_blank">${title}</a>`;
      });
    return (
      <div className="cm-link" dangerouslySetInnerHTML={{__html: content}}></div>
    );
  }
}
