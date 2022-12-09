import {BrowserRouter , Routes , Route} from 'react-router-dom'
import {Landing,Error,Register} from './pages'
import {AddJob,AllJobs,Profile,SharedLayout,Stats} from './pages/dashboard'
import ProtectedRoute from './pages/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path= '/' element={
          <ProtectedRoute>
            <SharedLayout />
          </ProtectedRoute>
        }>
          <Route index element={<Stats />} />
          <Route path='all-jobs' element={<AllJobs />} />
          <Route path='add-Job' element={<AddJob />} />
          <Route path='profile' element={<Profile />} />
        </Route>
        <Route path='/register' element={<Register />}/>
        <Route path='/landing' element={<Landing />}/>
        <Route path='*' element={<Error />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
