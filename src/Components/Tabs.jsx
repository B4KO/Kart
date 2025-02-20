import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const Tabs = ({ tabs, activeTab, onTabChange }) => {
    return (
        <div>
            {/* Tabs Header */}
            <div className="tabs tabs-boxed tabs-lg">
                {tabs.map((tab) => (
                    <a
                        key={tab.id}
                        className={`tab ${activeTab === tab.id ? "tab-active" : ""}`}
                        onClick={() => onTabChange(tab.id)}
                    >
                        <FontAwesomeIcon icon={tab.icon}></FontAwesomeIcon>
                        <p className="ml-1 text-lg">{tab.label}</p>
                    </a>
                ))}
            </div>
        </div>
    );
};

export default Tabs;
