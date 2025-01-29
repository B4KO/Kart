function ContentCard({ project, onClose }) {
    if (!project) {
        return null; // don't render anything if no project provided
    }

    return (
        <div className="card bg-base-100 w-full shadow-xl mt-4 relative">
            <figure>
                <img
                    src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                    alt="Some alt text"
                />
            </figure>

            <div className="card-body">
                {/* Close button */}
                <div className="card-actions justify-end">
                    <button className="btn btn-square btn-sm" onClick={onClose}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>

                <h2 className="card-title">{project.title}</h2>
                <p>Region: {project.region}</p>
                <p>Eier: {project.owner}</p>

                <div className="card-actions justify-end">
                    <div className="badge badge-outline">
                        Project ID: {project.projectId}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ContentCard;
