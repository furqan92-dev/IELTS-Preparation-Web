import { Link } from "react-router-dom";
import listeningTestImage from "../../../../../assets/images/registered/nonAdmin/tests/ListeningTest.jpg";
import { LISTENING_TESTS } from "../../../../../constants/StaticConstants";

const ListeningTestDetail = () => {
  return (
    <div className="mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold w-56 mx-auto text-white text-center bg-[#003366] rounded-full py-2 px-5 mb-6">
        Listening
      </h1>

      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-2 text-center">
          Duration:
        </h2>
        <p className="text-gray-600 text-center">
          About 30 minutes to listen and answer.
          <br />
          Plus 10 extra minutes (paper-based)
        </p>
      </div>

      <div className="flex gap-10">
        <div>
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              Listening Test - Introduction:
            </h2>
            <p className="text-gray-600 mb-4">
              The IELTS Listening Test checks your ability to understand spoken
              English in real-life situations.
              <br />
              You will listen to four recordings and answer 40 questions in
              about 30 minutes, plus 10 minutes extra (only in paper-based test)
              to transfer your answers.
              <br />
              Both Academic and General Training candidates take the same
              Listening Test.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              Structure:
            </h2>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>
                <span className="font-medium">Part 1:</span> Conversation about
                everyday social needs (e.g., booking tickets).
              </li>
              <li>
                <span className="font-medium">Part 2:</span> Monologue about a
                general topic (e.g., tour guide talk).
              </li>
              <li>
                <span className="font-medium">Part 3:</span> Conversation
                related to education or training (e.g., students discussing an
                assignment).
              </li>
              <li>
                <span className="font-medium">Part 4:</span> Academic lecture or
                speech (e.g., university talk).
              </li>
            </ul>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              Key Points:
            </h2>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Total 4 Parts and 40 questions.</li>
              <li>Difficulty increases with each part.</li>
              <li>You hear the recording only once.</li>
              <li>
                Questions types include: multiple choice, form completion,
                sentence completion, map labeling, etc.
              </li>
            </ul>
          </div>

          <hr className="my-6 border-gray-200" />

          <div className="space-x-14 flex justify-center">
            {LISTENING_TESTS.map((testQuestions, index) => (
              <Link
                key={testQuestions.id}
                to={`/tests/listening-tests/${testQuestions.id}`}
                state={{ testQuestions }}
                className="text-lg font-medium text-white bg-[#003366] px-5 py-2 rounded-full"
              >
                Listening Test {index + 1}
              </Link>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <img
            src={listeningTestImage}
            alt="IELTS Listening Test Introduction"
            className="w-96 h-96 rounded-lg border border-gray-200"
          />
        </div>
      </div>
    </div>
  );
};

export default ListeningTestDetail;