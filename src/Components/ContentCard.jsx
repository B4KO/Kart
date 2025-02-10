import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

function ContentCard({ project, onClose }) {
  if (!project) return null;

  return (
    <div className="card w-full h-full bg-base-100 shadow-xl rounded-lg">
      <div className="card-body p-6 relative">
        {/* Close Button using FontAwesome */}
        <button
          className="btn btn-sm btn-circle btn-ghost absolute top-4 right-4"
          onClick={onClose}
        >
          <FontAwesomeIcon className="text-lg" icon={ faTimes } />
        </button>

        {/* Card Header */}
        <h2 className="card-title text-2xl font-bold text-gray-800">
          {project.title}
        </h2>

        {/* Project Details */}
        <div className="mt-4 space-y-2">
          <p className="text-gray-600">
            <span className="font-semibold">Region:</span> {project.region}
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">Eier:</span> {project.owner}
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">Sector:</span> {project.sector}
          </p>
          <p className="text-gray-600 flex items-center">
            <span className="font-semibold">Status:</span>
            <span
              className={`badge ml-2 ${
                project.status === "Avsluttet" ? "badge-success" : "badge-warning"
              }`}
            >
              {project.status}
            </span>
          </p>
          <p className="text-gray-600">
            {project.description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ContentCard;
