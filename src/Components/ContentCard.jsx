function ContentCard({ project, onClose }) {
  if (!project) {
    return null; // don't render anything if no project provided
  }

  return (
    <div className="card shadow-md w-full h-full relative rounded-lg">
      <div className="card-body w-full h-full p-6">
        {/* Close button */}
        <div className="absolute top-4 right-4">
          <button
            className="btn btn-circle btn-sm btn-ghost hover:bg-gray-300"
            onClick={onClose}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
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

        {/* Card Content */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          {project.title}
        </h2>
        <p className="text-gray-600 mb-2">
          <span className="font-medium">Region:</span> {project.region}
        </p>
        <p className="text-gray-600">
          <span className="font-medium">Eier:</span> {project.owner}
        </p>

        {/* Project ID */}
        <div className="card-actions justify-end mt-6">
          <span className="badge badge-outline border-gray-500 text-gray-600 px-4 py-2">
            Project ID: {project.projectId}
          </span>
        </div>
      </div>
    </div>
  );
}

export default ContentCard;
