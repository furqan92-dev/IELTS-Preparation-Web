import IELTS from "../../../assets/images/registered/nonAdmin/tips/IELTS.jpg";
import IDPEducation from "../../../assets/images/registered/nonAdmin/tips/IDP.png";
import BritishCouncil from "../../../assets/images/registered/nonAdmin/tips/British.png";
import Cambridge from "../../../assets/images/registered/nonAdmin/tips/Cambridge.png";
import IELTSFormat from "../../../assets/images/registered/nonAdmin/tips/IELTSFormat.jpg";
import PaperComputerBased from "../../../assets/images/registered/nonAdmin/tips/PaperComputerBased.jpg";
import ComputerIELTS from "../../../assets/images/registered/nonAdmin/tips/ComputerIELTS.jpg";

const TIps = () => {
  return (
    <>
      <div className="bg-[#003366] w-full h-80 mt-28 flex justify-center items-center">
        <h1 className="text-white text-7xl">Tips For IELTS</h1>
      </div>
      <div className="m-20">
        <h1 className="text-[#003366]">IELTS</h1>
        <div className="flex items-center">
          <p className="text-xl">
            IELTS (International English Language Testing System) is a globally
            recognized English proficiency test designed to assess the language
            ability of candidates who need to study,work, or migrate to an
            English-speaking environment. It evaluates four key skills:
            Listening, Reading, Writing, and Speaking, and is jointly managed by
            the British Council, IDP: IELTS Australia, and Cambridge English.
          </p>
          <img src={IELTS} alt="" className="w-44 h-44" />
        </div>
        <h1 className="text-[#003366]"> Why IELTS</h1>
        <p className="text-xl">
          IELTS is a widely accepted English language test used for study, work,
          and migration. Recognized by universities and governments around the
          world, it assesses real-life English skills through Listening,
          Reading, Writing, and Speaking. With Academic and General Training
          options, it meets the needs of students, professionals, and migrants.
          Its reliability, fairness, and global reach make IELTS a trusted
          choice for proving English proficiency.
        </p>
        <div className="flex justify-center items-center gap-20">
          <img src={IDPEducation} alt="" className="w-72 h-72" />
          <img src={BritishCouncil} alt="" className="w-72 h-72" />
          <img src={Cambridge} alt="" className="w-72 h-72" />
        </div>
        <div className="flex">
          <div className="w-1/2">
            <section className="mb-8">
              <h1 className="text-[#003366]">1. General IELTS Tips</h1>
              <ul className="list-disc list-inside space-y-2">
                <li>
                  <span className="text-[#003366] font-black text-2xl">
                    Understand the Test Format:
                  </span>
                  <ul className="list-disc list-inside ml-6">
                    <li className="text-xl">
                      Familiarize yourself with Listening, Reading, Writing,
                      Speaking modules.
                    </li>
                    <li className="text-xl">
                      Learn the number of questions and timing for each section.
                    </li>
                    <li className="text-xl">
                      Know the difference between Academic and General Training
                      versions.
                    </li>
                  </ul>
                </li>
                <li>
                  <span className="text-[#003366] font-black text-2xl">
                    Time Management Strategies:
                  </span>
                  <ul className="list-disc list-inside ml-6">
                    <li className="text-xl">
                      Practice full mock tests under timed conditions.
                    </li>
                    <li className="text-xl">
                      Skim instructions quickly at the start.
                    </li>
                    <li className="text-xl">
                      Move on if stuck, return later if needed.
                    </li>
                  </ul>
                </li>
                <li>
                  <span className="text-[#003366] font-black text-2xl">
                    How IELTS is Scored (Band Descriptors):
                  </span>
                  <ul className="list-disc list-inside ml-6">
                    <li className="text-xl">
                      Bands from 0 to 9 in half-point increments.
                    </li>
                    <li className="text-xl">
                      Criteria: Task Achievement, Coherence, Vocabulary, Grammar
                      (Writing & Speaking).
                    </li>
                    <li className="text-xl">
                      Listening/Reading: raw scores converted to bands.
                    </li>
                  </ul>
                </li>
                <li>
                  <span className="text-[#003366] font-black text-2xl">
                    Common Mistakes to Avoid:
                  </span>
                  <ul className="list-disc list-inside ml-6">
                    <li className="text-xl">
                      Leaving blanks—always attempt an answer.
                    </li>
                    <li className="text-xl">
                      Not reading instructions carefully.
                    </li>
                    <li className="text-xl">
                      Copying from passages without understanding.
                    </li>
                    <li className="text-xl">
                      Speaking too little or off-topic.
                    </li>
                  </ul>
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h1 className="text-[#003366]">2. Best Time to Take IELTS</h1>
              <ul className="list-disc list-inside space-y-2">
                <li className="text-xl">
                  Plan 2–3 months before your application deadline.
                </li>
                <li className="text-xl">
                  Avoid last-minute booking for preparation and retake buffer.
                </li>
                <li className="text-xl">
                  Morning slots (9 AM) are better for focus.
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h1 className="text-[#003366]">3. When to Start Preparation</h1>
              <ul className="list-disc list-inside space-y-2">
                <li className="text-xl">
                  Start 6-8 weeks before your test date.
                </li>
                <li className="text-xl">
                  Take a mock test early to assess your level.
                </li>
                <li className="text-xl">Focus more on weaker modules.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h1 className="text-[#003366]">4. Retaking IELTS</h1>
              <ul className="list-disc list-inside space-y-2">
                <li className="text-xl">No limit on retakes.</li>
                <li className="text-xl">
                  One Skill Retake available in some countries.
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h1 className="text-[#003366]">5. Test Day Tips</h1>
              <ul className="list-disc list-inside space-y-2">
                <li className="text-xl">Arrive 30-45 minutes early.</li>
                <li className="text-xl">
                  Bring the ID/passport used for registration.
                </li>
                <li className="text-xl">Stay calm and hydrated.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h1 className="text-[#003366]">
                6. Paper-based vs Computer-based
              </h1>
              <ul className="list-disc list-inside space-y-2">
                <li className="text-xl">
                  Computer-based = faster results (3–5 days) and flexible
                  timing.
                </li>
                <li className="text-xl">
                  Paper-based = better if you prefer writing by hand.
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h1 className="text-[#003366]">7. Practice Sources</h1>
              <ul className="list-disc list-inside space-y-2">
                <li className="text-xl">
                  Use official Cambridge IELTS books and British Council
                  resources.
                </li>
                <li className="text-xl">
                  Avoid random YouTube tips; prefer reliable sources.
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h1 className="text-[#003366]">8. Improve English Daily</h1>
              <ul className="list-disc list-inside space-y-2">
                <li className="text-xl">
                  Watch English shows, read articles, practice speaking with
                  friends or apps.
                </li>
              </ul>
            </section>
          </div>
          <div className="w-1/2">
            <img
              src={IELTSFormat}
              alt=""
              className="w-[341px] h-[484px] mx-auto"
            />
            <img
              src={PaperComputerBased}
              alt=""
              className="w-[504px] h-[355px] mx-auto mt-10"
            />
            <img
              src={ComputerIELTS}
              alt=""
              className="w-[400px] h-[400px] mx-auto mt-10"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default TIps;
