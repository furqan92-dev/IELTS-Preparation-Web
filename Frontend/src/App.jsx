import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Home from "./pages/unregistered/Home";
import AdminHome from "./pages/registered/admin/Home";
import NonAdminHome from "./pages/registered/nonAdmin/Home";
import Navbar from "./components/unregistered/Navbar";
import NonAdminNavbar from "./components/registered/nonAdmin/Navbar";
import AdminNavbar from "./components/registered/admin/Navbar";
import Profile from "./components/registered/nonAdmin/Profile";
import ManageUsers from "./pages/registered/admin/ManageUsers";
import ManageResources from "./pages/registered/admin/ManageResources";
import ManageTests from "./pages/registered/admin/ManageTests";
import SiteSettings from "./pages/registered/admin/SiteSettings";
import AboutIELTS from "./pages/registered/nonAdmin/AboutIELTS";
import Tips from "./pages/registered/nonAdmin/TIps";
import LearningMaterials from "./pages/registered/nonAdmin/learningMaterials/LearningMaterials";
import Cards from "./components/registered/nonAdmin/Cards";
import PastPapers from "./pages/registered/nonAdmin/learningMaterials/PastPapers";
import Books from "./pages/registered/nonAdmin/learningMaterials/Books";
import Pdfs from "./pages/registered/nonAdmin/learningMaterials/Pdfs";
import Ppts from "./pages/registered/nonAdmin/learningMaterials/PPTs";
import Videos from "./pages/registered/nonAdmin/learningMaterials/Videos";
import IELTSOverview from "./pages/registered/nonAdmin/learningMaterials/IELTSOverview";
import ListeningTestDetail from "./pages/registered/nonAdmin/tests/listening/ListeningTestDetail";
import ListeningTest from "./pages/registered/nonAdmin/tests/listening/ListeningTest";
import ReadingTestDetail from "./pages/registered/nonAdmin/tests/reading/ReadingTestDetail";
import ReadingTest from "./pages/registered/nonAdmin/tests/reading/ReadingTest";
import WritingTestDetail from "./pages/registered/nonAdmin/tests/writing/WritingTestDetail";
import WritingTest from "./pages/registered/nonAdmin/tests/writing/WritingTest";
import SpeakingTestDetail from "./pages/registered/nonAdmin/tests/speaking/SpeakingTestDetail";
import SpeakingTest from "./pages/registered/nonAdmin/tests/speaking/SpeakingTest";
import ListeningTestResult from "./pages/registered/nonAdmin/tests/listening/ListeningTestResult";
import ReadingTestResult from "./pages/registered/nonAdmin/tests/reading/ReadingTestResult";
import WritingTestResult from "./pages/registered/nonAdmin/tests/writing/WritingTestResult";
import SpeakingTestResult from "./pages/registered/nonAdmin/tests/speaking/SpeakingTestResult";

const App = () => {
  const [showRegModal, setShowRegModal] = useState(false);
  const { user } = useContext(AuthContext);
  const [materialsrc, serMaterialsrc] = useState("");
  const [materialTitle, setMaterialTitle] = useState("");

  return (
    <>
      {user ? (
        user.is_staff ? (
          <>
            <AdminNavbar />
            <Routes>
              <Route path="/" element={<AdminHome />} />
              <Route path="/manage-users" element={<ManageUsers />} />
              <Route path="/manage-resources" element={<ManageResources />} />
              <Route path="/manage-tests" element={<ManageTests />} />
              <Route path="/site-settings" element={<SiteSettings />} />
            </Routes>
          </>
        ) : (
          <>
            <NonAdminNavbar />
            <Routes>
              <Route path="/" element={<NonAdminHome materialsrc={materialsrc} materialTitle={materialTitle} />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/about-ielts" element={<AboutIELTS />} />
              <Route path="/tips" element={<Tips />} />
              <Route path="/learning-materials" element={<LearningMaterials />} />
              <Route path="/listening-materials" element={<Cards materialType="Listening" />} />
              <Route path="/reading-materials" element={<Cards materialType="Reading" />} />
              <Route path="/writing-materials" element={<Cards materialType="Writing" />} />
              <Route path="/speaking-materials" element={<Cards materialType="Speaking" />} />
              <Route path="/past-papers" element={<PastPapers />} />
              <Route path="/ielts-overview" element={<IELTSOverview />} />
              <Route path="/books" element={<Books serMaterialsrc={serMaterialsrc} setMaterialTitle={setMaterialTitle} />} />
              <Route path="/pdfs" element={<Pdfs serMaterialsrc={serMaterialsrc} setMaterialTitle={setMaterialTitle} />} />
              <Route path="/ppts" element={<Ppts serMaterialsrc={serMaterialsrc} setMaterialTitle={setMaterialTitle} />} />
              <Route path="/videos" element={<Videos serMaterialsrc={serMaterialsrc} setMaterialTitle={setMaterialTitle} />} />
              <Route path="/tests" element={<Cards materialType="" />} />
              <Route path="/tests/listening-tests" element={<ListeningTestDetail />} />
              <Route path="/tests/listening-tests/:id" element={<ListeningTest />} />
              <Route path="/tests/reading-tests" element={<ReadingTestDetail />} />
              <Route path="/tests/reading-tests/:id" element={<ReadingTest />} />
              <Route path="/tests/writing-tests" element={<WritingTestDetail />} />
              <Route path="/tests/writing-tests/:id" element={<WritingTest />} />
              <Route path="/tests/speaking-tests" element={<SpeakingTestDetail />} />
              <Route path="/tests/speaking-tests/:id" element={<SpeakingTest />} />
              <Route path="/listening-test-result" element={<ListeningTestResult />} />
              <Route path="/reading-test-result" element={<ReadingTestResult />} />
              <Route path="/writing-test-result" element={<WritingTestResult />} />
              <Route path="/speaking-test-result" element={<SpeakingTestResult />} />
            </Routes>
          </>
        )
      ) : (
        <>
          <Navbar showRegModal={showRegModal} setShowRegModal={setShowRegModal} />
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </>
      )}
    </>
  );
};

export default App;