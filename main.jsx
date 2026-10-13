import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { LayoutDashboard, CheckSquare, CalendarDays, BarChart3, Settings, Search, Bell, Plus, Sparkles, Clock3, ArrowUpRight, MoreHorizontal, ChevronDown, CircleHelp, Menu, X, Check, Zap, Target, Command } from 'lucide-react';
import './styles.css';

const initialTasks = [
  { id: 1, title: 'Finalize homepage wireframes', project: 'Website redesign', date: 'Today', priority: 'High', done: false, color: 'purple' },
  { id: 2, title: 'Review user interview notes', project: 'Product research', date: 'Today', priority: 'Medium', done: false, color: 'blue' },
  { id: 3, title: 'Prepare sprint presentation', project: 'Team operations', date: 'Tomorrow', priority: 'High', done: true, color: 'orange' },
  { id: 4, title: 'Update component library', project: 'Design system', date: 'Oct 16', priority: 'Low', done: false, color: 'green' },
];

function App() {
  const [tasks, setTasks] = useState(initialTasks);
  const [activeNav, setActiveNav] = useState('Overview');
  const [query, setQuery] = useState('');
  const [showAdd, setShowAdd] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [mobileMenu, setMobileMenu] = useState(false);
  const [notice, setNotice] = useState('');
  const [aiPlan, setAiPlan] = useState(false);
  const [filter, setFilter] = useState('All tasks');
  const [openTaskMenu, setOpenTaskMenu] = useState(null);

  const visibleTasks = useMemo(() => tasks.filter(t => {
    const matchesQuery = (t.title + ' ' + t.project).toLowerCase().includes(query.toLowerCase());
    const matchesFilter = filter === 'All tasks' || (filter === 'Completed' ? t.done : !t.done);
    return matchesQuery && matchesFilter;
  }), [tasks, query, filter]);

  const toggleTask = id => setTasks(old => old.map(t => t.id === id ? { ...t, done: !t.done } : t));
  const addTask = e => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    setTasks(old => [{ id: Date.now(), title: newTitle.trim(), project: 'Personal workspace', date: 'Today', priority: 'Medium', done: false, color: 'purple' }, ...old]);
    setNewTitle(''); setShowAdd(false); setNotice('Task added to your workspace.');
    setTimeout(() => setNotice(''), 2600);
  };
  const navItems = [
    { label: 'Overview', icon: LayoutDashboard }, { label: 'My tasks', icon: CheckSquare },
    { label: 'Calendar', icon: CalendarDays }, { label: 'Insights', icon: BarChart3 }
  ];

  return <div className="app-shell">
    <aside className={`sidebar ${mobileMenu ? 'sidebar-open' : ''}`}>
      <div className="brand"><div className="brand-mark"><Zap size={19} fill="currentColor" /></div><span>taskflow<span className="brand-dot">.</span></span><button className="mobile-close" onClick={() => setMobileMenu(false)} aria-label="Close menu"><X size={18}/></button></div>
      <div className="workspace-label">WORKSPACE</div>
      <button className="workspace-switch"><div className="workspace-avatar">S</div><span><b>Sunita's space</b><small>Free workspace</small></span><ChevronDown size={16} className="muted-icon"/></button>
      <nav className="nav-list">{navItems.map(({label, icon: Icon}) => <button key={label} className={`nav-item ${activeNav === label ? 'active' : ''}`} onClick={() => {setActiveNav(label); setMobileMenu(false);}}><Icon size={18}/><span>{label}</span>{label === 'My tasks' && <span className="nav-count">{tasks.filter(t=>!t.done).length}</span>}</button>)}</nav>
      <div className="sidebar-section"><span className="workspace-label">YOUR PROJECTS</span><button className="project-link"><i className="project-dot dot-purple"/>Website redesign</button><button className="project-link"><i className="project-dot dot-blue"/>Product research</button><button className="project-link"><i className="project-dot dot-orange"/>Team operations</button><button className="add-project" onClick={() => setNotice('Project creation is coming soon.') }><Plus size={15}/> Add project</button></div>
      <div className="sidebar-bottom"><div className="help-card"><div className="help-icon"><CircleHelp size={17}/></div><b>Need a hand?</b><p>Explore tips to get more out of TaskFlow.</p><button onClick={() => setNotice('Help center preview — coming soon.')}>Visit help center <ArrowUpRight size={14}/></button></div><button className="nav-item bottom-link" onClick={() => setNotice('Settings preview — coming soon.')}><Settings size={18}/>Settings</button><div className="profile-row"><div className="profile-avatar">SR</div><span><b>Sunita Raut</b><small>Product designer</small></span><MoreHorizontal size={18} className="muted-icon"/></div></div>
    </aside>

    <main className="main-area">
      <header className="topbar"><button className="mobile-menu" onClick={() => setMobileMenu(true)} aria-label="Open menu"><Menu size={21}/></button><div className="breadcrumb">Workspace <span>/</span> <b>{activeNav}</b></div><div className="top-actions"><label className="search-box"><Search size={17}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search tasks..." /><kbd>⌘ K</kbd></label><button className="icon-button notification" aria-label="Notifications" onClick={() => setNotice('You’re all caught up!')}><Bell size={18}/><i/></button><div className="top-avatar">SR</div></div></header>

      <div className="page-content">
        <div className="welcome-row"><div><div className="eyebrow"><span className="eyebrow-line"/> TUESDAY, OCTOBER 13, 2026</div><h1>{activeNav === 'Overview' ? 'Good evening, Sunita' : activeNav}<span className="wave">✦</span></h1><p className="subheading">{activeNav === 'Overview' ? 'A little progress each day adds up to big results.' : 'Keep your momentum going — one step at a time.'}</p></div><button className="primary-button" onClick={() => setShowAdd(true)}><Plus size={17}/> New task</button></div>

        <section className="stats-grid">
          <div className="stat-card"><div className="stat-top"><span>Tasks completed</span><div className="stat-icon lilac"><CheckSquare size={17}/></div></div><div className="stat-value">{tasks.filter(t=>t.done).length + 12}<span className="stat-trend"><ArrowUpRight size={14}/> 12%</span></div><div className="stat-foot">Compared to last week</div><div className="mini-bars">{[35,52,40,70,56,85,68,94,73,100,78,90].map((h,i)=><i key={i} style={{height:h+'%'}}/>)}</div></div>
          <div className="stat-card"><div className="stat-top"><span>In progress</span><div className="stat-icon blue-bg"><Clock3 size={17}/></div></div><div className="stat-value">{tasks.filter(t=>!t.done).length + 5}<span className="stat-label">active</span></div><div className="stat-foot">Across 3 projects</div><div className="progress-track"><i style={{width:'64%'}}/></div><div className="progress-caption"><span>Weekly capacity</span><b>64%</b></div></div>
          <div className="stat-card"><div className="stat-top"><span>Productivity score</span><div className="stat-icon orange-bg"><Target size={17}/></div></div><div className="stat-value">86<span className="value-outof">/100</span><span className="score-pill">Great!</span></div><div className="stat-foot">You’re doing better than 78% of users</div><div className="score-line"><i/></div></div>
        </section>

        <section className="content-grid">
          <div className="panel tasks-panel"><div className="panel-header"><div><h2>My tasks</h2><p>Your focus, all in one place.</p></div><button className="text-button" onClick={()=>{setActiveNav('My tasks');setFilter('All tasks')}}>View all <ArrowUpRight size={15}/></button></div>
            <div className="task-toolbar"><div className="filter-tabs">{['All tasks','Pending','Completed'].map(f=><button key={f} className={filter===f?'selected':''} onClick={()=>setFilter(f)}>{f}</button>)}</div><button className="sort-button" onClick={()=>setNotice('Tasks are sorted by priority and due date.')}><span>Priority</span><ChevronDown size={14}/></button></div>
            
<div className="task-list">
  {visibleTasks.length ? (
    visibleTasks.map(t => (
      <div
        className={`task-row ${t.done ? 'task-done' : ''}`}
        key={t.id}
      >
        <button
          className={`task-check ${t.done ? 'checked' : ''}`}
          onClick={() => toggleTask(t.id)}
          aria-label={t.done ? 'Mark incomplete' : 'Complete task'}
        >
          {t.done && <Check size={13} />}
        </button>

        <div className={`task-color ${t.color}`} />

        <div className="task-info">
          <b>{t.title}</b>
          <span>{t.project}</span>
        </div>

        <span className={`priority ${t.priority.toLowerCase()}`}>
          {t.priority}
        </span>

        <span className="task-date">
          <Clock3 size={13} />
          {t.date}
        </span>

        <div className="task-menu-wrapper">
          <button
            className="row-more"
            onClick={() =>
              setOpenTaskMenu(openTaskMenu === t.id ? null : t.id)
            }
            aria-label="Task options"
            aria-expanded={openTaskMenu === t.id}
          >
            <MoreHorizontal size={17} />
          </button>

          {openTaskMenu === t.id && (
            <div className="task-dropdown">
              <button
                onClick={() => {
                  const title = window.prompt('Edit task title:', t.title);

                  if (title !== null && title.trim()) {
                    setTasks(old =>
                      old.map(task =>
                        task.id === t.id
                          ? { ...task, title: title.trim() }
                          : task
                      )
                    );
                  }

                  setOpenTaskMenu(null);
                }}
              >
                Edit task
              </button>

              <button
                onClick={() => {
                  const priorities = {
                    High: 'Medium',
                    Medium: 'Low',
                    Low: 'High'
                  };

                  setTasks(old =>
                    old.map(task =>
                      task.id === t.id
                        ? { ...task, priority: priorities[task.priority] }
                        : task
                    )
                  );

                  setOpenTaskMenu(null);
                  setNotice('Task priority updated.');
                }}
              >
                Change priority
              </button>

              <button
                className="delete-option"
                onClick={() => {
                  if (window.confirm(`Delete "${t.title}"?`)) {
                    setTasks(old =>
                      old.filter(task => task.id !== t.id)
                    );
                    setNotice('Task deleted.');
                  }

                  setOpenTaskMenu(null);
                }}
              >
                Delete task
              </button>
            </div>
          )}
        </div>
      </div>
    ))
  ) : (
    <div className="empty-state">
      No tasks match your search. Try another keyword.
    </div>
  )}
</div>

            <button className="add-task-inline" onClick={()=>setShowAdd(true)}><Plus size={16}/> Add a task</button>
          </div>

          <div className="right-column">
            <div className="ai-card"><div className="ai-glow glow-one"/><div className="ai-glow glow-two"/><div className="ai-label"><span><Sparkles size={15}/></span> TASKFLOW AI</div><h2>A smarter way<br/>to get things done.</h2><p>Turn your to-do list into a clear plan. Let AI help you find your focus.</p><button className="ai-button" onClick={()=>setAiPlan(!aiPlan)}>{aiPlan?'Hide focus plan':'Build my focus plan'} <ArrowUpRight size={15}/></button>{aiPlan&&<div className="focus-plan"><b><Check size={14}/> Your suggested focus</b><span>1. Finish the homepage wireframes</span><span>2. Review research notes for 20 min</span><span>3. Take a short reset break</span><small>Demo suggestion — no external AI service connected.</small></div>}<div className="ai-decoration"><Sparkles size={72}/></div></div>
            <div className="panel schedule-panel"><div className="panel-header"><div><h2>Upcoming</h2><p>What’s next on your list.</p></div><button className="more-button" onClick={()=>setActiveNav('Calendar')}><MoreHorizontal size={19}/></button></div><div className="upcoming-item"><div className="date-tile"><b>14</b><span>OCT</span></div><div className="upcoming-info"><b>Design review</b><span><Clock3 size={13}/> 10:30 AM – 11:00 AM</span></div><div className="attendee-stack"><i>S</i><i>J</i><i>+2</i></div></div><div className="upcoming-item"><div className="date-tile date-blue"><b>16</b><span>OCT</span></div><div className="upcoming-info"><b>Sprint planning</b><span><Clock3 size={13}/> 2:00 PM – 2:45 PM</span></div><div className="attendee-stack"><i>M</i><i>A</i></div></div><button className="calendar-link" onClick={()=>setActiveNav('Calendar')}>Open calendar <ArrowUpRight size={14}/></button></div>
          </div>
        </section>
        <footer className="footer"><span>© 2026 TaskFlow Studio</span><span>Designed for focus <span className="footer-heart">✦</span></span><span>Privacy · Help · Feedback</span></footer>
      </div>
    </main>
    {showAdd && <div className="modal-backdrop" onMouseDown={e=>{if(e.target===e.currentTarget)setShowAdd(false)}}><form className="task-modal" onSubmit={addTask}><div className="modal-head"><div><span className="modal-kicker">YOUR WORKSPACE</span><h2>Create a task</h2></div><button type="button" className="icon-button" onClick={()=>setShowAdd(false)}><X size={18}/></button></div><label className="field-label">Task name<input autoFocus value={newTitle} onChange={e=>setNewTitle(e.target.value)} placeholder="e.g. Sketch onboarding flow" required /></label><div className="modal-note"><Sparkles size={15}/> Keep it clear, actionable, and small enough to start.</div><div className="modal-actions"><button type="button" className="cancel-button" onClick={()=>setShowAdd(false)}>Cancel</button><button type="submit" className="primary-button">Create task <Plus size={15}/></button></div></form></div>}
    {notice && <div className="toast"><Check size={16}/>{notice}<button onClick={()=>setNotice('')}><X size={14}/></button></div>}
  </div>;
}
createRoot(document.getElementById('root')).render(<App/>);