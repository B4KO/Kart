import { useState } from "react";

const Tabs = ({ tabs, defaultActiveTab }) => {
    const [activeTab, setActiveTab] = useState(defaultActiveTab);

    return (
        <div>
            {/* Tabs Header */}
            <div className="tabs tabs-boxed tabs-lg">
                {tabs.map((tab) => (
                    <a
                        key={tab.id}
                        className={`tab ${activeTab === tab.id ? "tab-active" : ""}`}
                        onClick={() => setActiveTab(tab.id)}
                    >
                        {tab.icon}
                        <p className="ml-1 text-lg">{tab.label}</p>
                    </a>
                ))}
            </div>

            {/* Tabs Content */}
            <div className="border border-base-300 rounded-lg">
                {tabs.map(
                    (tab) =>
                        activeTab === tab.id && (
                            <div key={tab.id} className="p-4">
                                {tab.component}
                            </div>
                        )
                )}
            </div>
        </div>
    );
};

export default Tabs;
