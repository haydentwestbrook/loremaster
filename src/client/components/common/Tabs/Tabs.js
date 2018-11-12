import React, { Component, Fragment } from "react";

class Tabs extends Component {
  constructor(props) {
    super(props);
    const {tabs} = props;
    if(tabs.length > 0) {
      this.state = { activeTab: 0 };
    } else {
      this.state = {activeTab: null};
    }
    
  }

  showTab = (tabId) => {
    this.setState({ activeTab: tabId });
  }

  render() {
    const { id, tabs, children } = this.props;
    const { activeTab } = this.state;
    return (
      <div className={'row flex-spaces tabs ' + id}>
        <TabHeaders  id={id} tabs={tabs} show={this.showTab} activeTab={activeTab} />
        <TabContent id={id} tabs={tabs} activeTab={activeTab}>
          {children}
        </TabContent>
      </div>
    );
  }
}

const TabHeaders = props => {
  const { id, tabs, show, activeTab } = props;
  const headerClass = `${id}-headers`
  return  (
    <div className={'tabs-headers ' + headerClass}>
      {tabs.map((tab, index) => {
      const tabId = `${id}-${index}`;
      const active = activeTab == index;
      return (
          <label key={tabId} htmlFor={tabId} onClick={() => show(index)} className={active ? 'tabs-active' : ''}>
            {tab}
          </label>
      );
    })}
    </div>
  )
};

const TabContent = props => {
  const { id, tabs, children, activeTab } = props;
  const contentClass = `${id}-content`;
  return tabs.map((tab, index) => {
    const active = activeTab == index;
    return (
      active ? (
        <div className={'tabs-content ' + contentClass} key={tab}>
          {children[activeTab]}
        </div>
      ) : null
    );
  });
};

export default Tabs;
