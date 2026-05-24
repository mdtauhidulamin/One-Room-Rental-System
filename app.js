const PLACEHOLDER="assets/placeholder.svg";const TR={en:{home:"Home",rooms:"Rooms",about:"About",team:"Our Team",userLogin:"User Login",ownerLogin:"Owner Login",adminLogin:"Admin Login",userLogout:"User Logout",ownerLogout:"Owner Logout",adminLogout:"Admin Logout",adminPanel:"Admin Panel",dashboard:"Dashboard",openMap:"Open KakaoMap",requestRent:"Request Rent",availableRooms:"Available Rooms",categoryNote:"Click a category to see specific room types.",allRooms:"All Rooms",oneRoom:"One Room",twoRoom:"Two Room",familyRoom:"Family Room",aboutProject:"About This Project",adminControlPanel:"Admin Control Panel",websiteSettings:"Website Settings",logoBackground:"Logo & Background",userAccounts:"User Accounts",ownerAccounts:"Owner Accounts",allRentRequests:"All Rent Requests",allRoomsTitle:"All Rooms",teamMembers:"Team Members",addTeamMember:"Add Team Member",myProfile:"My Profile",myOwnerProfile:"My Owner Profile",addRoom:"Add New Building / Room",myRooms:"My Rooms",requestsForMyRooms:"Requests for My Rooms",available:"Available",notAvailable:"Not Available",owner:"Owner",type:"Type",rent:"Rent",address:"Address",phone:"Phone",noRooms:"No rooms added yet. Owner must add rooms first."},ko:{home:"홈",rooms:"방 목록",about:"소개",team:"우리 팀",userLogin:"사용자 로그인",ownerLogin:"집주인 로그인",adminLogin:"관리자 로그인",userLogout:"사용자 로그아웃",ownerLogout:"집주인 로그아웃",adminLogout:"관리자 로그아웃",adminPanel:"관리자 패널",dashboard:"대시보드",openMap:"카카오맵 열기",requestRent:"임대 신청",availableRooms:"이용 가능한 방",categoryNote:"방 유형을 선택하면 해당 방만 볼 수 있습니다.",allRooms:"전체 방",oneRoom:"원룸",twoRoom:"투룸",familyRoom:"패밀리룸",aboutProject:"프로젝트 소개",adminControlPanel:"관리자 제어판",websiteSettings:"웹사이트 설정",logoBackground:"로고 및 배경",userAccounts:"사용자 계정",ownerAccounts:"집주인 계정",allRentRequests:"전체 임대 신청",allRoomsTitle:"전체 방",teamMembers:"팀원 목록",addTeamMember:"팀원 추가",myProfile:"내 프로필",myOwnerProfile:"집주인 프로필",addRoom:"새 건물 / 방 등록",myRooms:"내 방 목록",requestsForMyRooms:"내 방 임대 신청",available:"이용 가능",notAvailable:"이용 불가",owner:"집주인",type:"유형",rent:"월세",address:"주소",phone:"전화번호",noRooms:"등록된 방이 없습니다. 집주인이 먼저 방을 등록해야 합니다."}};const DEFAULT_SITE={websiteName:"Room Rental System",heroTitle:"Hillsville Room Rental System",heroSubtitle:"Owners can create accounts, add rooms with photos, rent, address, phone, and availability. Users can request rooms and check request status.",aboutText:"This project simulates a multi-owner and multi-user room rental workflow.",teamTitle:"Our Team",teamSubtitle:"Meet the members who contributed to this room rental project.",logo:"assets/logo.svg",background:"assets/placeholder.svg"};let db=null;try{if(typeof firebaseConfig!=="undefined"&&firebaseConfig.apiKey&&!firebaseConfig.apiKey.includes("PASTE")){firebase.initializeApp(firebaseConfig);db=firebase.firestore()}}catch(e){console.error(e)}function warnConfig(){if(!db&&!document.querySelector('.config-warning')){let d=document.createElement('div');d.className='config-warning';d.textContent='Firebase config boshao firebase-config.js file e. Tarpor real-time database kaj korbe.';document.body.prepend(d)}}function lang(){return localStorage.getItem('h5_lang')||'en'}function t(k){return(TR[lang()]&&TR[lang()][k])||TR.en[k]||k}function setLanguage(l){localStorage.setItem('h5_lang',l);applyLanguage();updateNavbar();renderRoomsLocal();renderTeamLocal()}function applyLanguage(){document.querySelectorAll('[data-i18n]').forEach(e=>e.textContent=t(e.dataset.i18n))}function escapeHtml(x){return String(x??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]))}function toDataURL(input,cb){let f=input.files[0];if(!f){cb(null);return}let r=new FileReader();r.onload=e=>cb(e.target.result);r.readAsDataURL(f)}function currentUser(){return JSON.parse(localStorage.getItem('h5_current_user')||'null')}function setCurrentUser(u){localStorage.setItem('h5_current_user',JSON.stringify(u))}function currentOwner(){return JSON.parse(localStorage.getItem('h5_current_owner')||'null')}function setCurrentOwner(o){localStorage.setItem('h5_current_owner',JSON.stringify(o))}function currentAdmin(){return localStorage.getItem('h5_current_admin')}function logoutUser(){localStorage.removeItem('h5_current_user');location.href='index.html'}function logoutOwnerGlobal(){localStorage.removeItem('h5_current_owner');location.href='index.html'}function adminLogout(){localStorage.removeItem('h5_current_admin');location.href='index.html'}async function docSet(c,id,data){if(!db)return warnConfig();return db.collection(c).doc(id).set(data,{merge:true})}async function docGet(c,id){if(!db){warnConfig();return null}let d=await db.collection(c).doc(id).get();return d.exists?{id:d.id,...d.data()}:null}async function addDoc(c,data){if(!db)return warnConfig();return db.collection(c).add(data)}async function delDoc(c,id){if(!db)return warnConfig();return db.collection(c).doc(id).delete()}async function getAll(c){if(!db){warnConfig();return[]}let s=await db.collection(c).get();return s.docs.map(d=>({id:d.id,...d.data()}))}function listenCol(c,cb){if(!db){warnConfig();cb([]);return()=>{}}return db.collection(c).onSnapshot(s=>cb(s.docs.map(d=>({id:d.id,...d.data()}))))}function listenDoc(c,id,cb){if(!db){warnConfig();cb(null);return()=>{}}return db.collection(c).doc(id).onSnapshot(d=>cb(d.exists?{id:d.id,...d.data()}:null))}function applySite(s){s={...DEFAULT_SITE,...(s||{})};document.querySelectorAll('.site-logo').forEach(i=>i.src=s.logo);document.querySelectorAll('.site-name').forEach(e=>e.textContent=s.websiteName);let h=document.querySelector('.hero');if(h){h.style.background=`linear-gradient(rgba(16,42,67,.72),rgba(16,42,67,.72)),url('${s.background}')`;h.style.backgroundSize='cover';h.style.backgroundPosition='center'};['heroTitle','heroSubtitle','aboutText','teamTitle','teamSubtitle'].forEach(id=>{let e=document.getElementById(id);if(e)e.textContent=s[id]});let title=document.querySelector('title');if(title)title.textContent=s.websiteName}function watchSettings(){listenDoc('settings','site',s=>applySite(s||DEFAULT_SITE))}function updateNavbar(){let ua=document.getElementById('userNavArea'),oa=document.getElementById('ownerNavArea'),aa=document.getElementById('adminNavArea'),u=currentUser(),o=currentOwner(),a=currentAdmin();if(ua)ua.innerHTML=u?`<a class="profile-btn" href="user-profile.html">👤 ${escapeHtml(u.name)}</a><button class="logout-btn" onclick="logoutUser()">${t('userLogout')}</button>`:`<a class="login-btn" href="user-login.html">${t('userLogin')}</a>`;if(oa)oa.innerHTML=o?`<a class="profile-btn" href="owner-profile.html">🏠 ${escapeHtml(o.name)}</a><a class="profile-btn" href="owner-dashboard.html">${t('dashboard')}</a><button class="logout-btn" onclick="logoutOwnerGlobal()">${t('ownerLogout')}</button>`:`<a class="login-btn" href="owner-login.html">${t('ownerLogin')}</a>`;if(aa)aa.innerHTML=a?`<a class="profile-btn" href="admin-dashboard.html">${t('adminPanel')}</a><button class="logout-btn" onclick="adminLogout()">${t('adminLogout')}</button>`:`<a class="login-btn" href="admin-login.html">${t('adminLogin')}</a>`}let currentRoomFilter='all',allRoomsCache=[];function filterRooms(type){currentRoomFilter=type;document.querySelectorAll('.filter-buttons button').forEach(b=>b.classList.remove('active'));let btn=document.querySelector(`[data-filter="${type}"]`);if(btn)btn.classList.add('active');renderRoomsLocal()}function renderRoomsLocal(){let box=document.getElementById('roomGrid');if(!box)return;let rooms=[...allRoomsCache];if(currentRoomFilter!=='all')rooms=rooms.filter(r=>String(r.type).toLowerCase().includes(currentRoomFilter));if(!rooms.length){box.innerHTML=`<p class="top-note">${t('noRooms')}</p>`;return}box.innerHTML=rooms.map(r=>`<div class="room-card"><img src="${r.image||PLACEHOLDER}"><div class="room-info"><span class="${r.available?'status available':'status not-available'}">${r.available?t('available'):t('notAvailable')}</span><h3>${escapeHtml(r.name)}</h3><p><b>${t('owner')}:</b> ${escapeHtml(r.ownerName)}</p><p><b>${t('type')}:</b> ${escapeHtml(r.type)}</p><p><b>${t('rent')}:</b> ${escapeHtml(r.rent)}</p><p><b>${t('address')}:</b> ${escapeHtml(r.address)}</p><p><b>${t('phone')}:</b> ${escapeHtml(r.phone)}</p><p>${escapeHtml(r.description)}</p><button onclick="requestRoom('${r.id}')">${t('requestRent')}</button></div></div>`).join('')}function watchRooms(){listenCol('rooms',rooms=>{allRoomsCache=rooms;renderRoomsLocal()})}async function requestRoom(id){let u=currentUser();if(!u){alert('Please login as user first.');location.href='user-login.html';return}let room=allRoomsCache.find(r=>r.id===id);if(!room||!room.available){alert('Room not available.');return}await addDoc('requests',{roomId:room.id,roomName:room.name,ownerEmail:room.ownerEmail,ownerName:room.ownerName,userName:u.name,userEmail:u.email,status:'Pending',date:new Date().toLocaleString()});alert('Request sent.')}let teamCache=[];function renderTeamLocal(){let box=document.getElementById('teamGrid');if(!box)return;if(!teamCache.length){box.innerHTML='<p class="top-note">No team members added yet.</p>';return}box.innerHTML=teamCache.map(m=>`<div class="team-card"><img src="${m.photo||PLACEHOLDER}"><h3>${escapeHtml(m.name)}</h3><p><b>${escapeHtml(m.role)}</b></p><p>${escapeHtml(m.details)}</p></div>`).join('')}function watchTeam(){listenCol('team',team=>{teamCache=team;renderTeamLocal()})}function initCommon(){watchSettings();updateNavbar();applyLanguage();warnConfig()}function initHome(){initCommon();watchRooms();watchTeam()}document.addEventListener('DOMContentLoaded',initCommon);

/* Admin Login Direct Fix */
function getAdminId(){
  try { return typeof ADMIN_ID !== "undefined" ? ADMIN_ID : "admin"; }
  catch(e){ return "admin"; }
}
function getAdminPassword(){
  try { return typeof ADMIN_PASSWORD !== "undefined" ? ADMIN_PASSWORD : "admin123"; }
  catch(e){ return "admin123"; }
}
function adminLoginNow(id, password){
  if(String(id).trim() === getAdminId() && String(password).trim() === getAdminPassword()){
    localStorage.setItem("h5_current_admin", "admin");
    location.href = "admin-dashboard.html";
    return true;
  }
  return false;
}
Mila_Team_Section_UI
<!-- Team section designed by Mila -->

<div class="team-container">
  <div class="team-card">
    <h3>Md Tauhidul Amin</h3>
    <p>Backend Developer</p>
    <p>Firebase, Authentication, Database Workflow</p>
  </div>

  <div class="team-card">
    <h3>Mila</h3>
    <p>Frontend Developer</p>
    <p>UI/UX Design, Homepage, Room Details, Dashboard</p>
  </div>
</div>


// Authentication system by Amin

function loginUser(email, password) {
    console.log("User login system initialized");

    // Firebase authentication logic placeholder
}

// Multilingual language system by Amin

function changeLanguage(lang) {
    if (lang === "en") {
        alert("Language changed to English");
    } else if (lang === "ko") {
        alert("한국어로 변경되었습니다");
    }
}
// Firebase database workflow by Amin

function saveRoomData(roomTitle, rent, address) {
    console.log("Room data saved:", roomTitle, rent, address);
}

function saveRentRequest(userName, roomId) {
    console.log("Rent request submitted:", userName, roomId);
}
main
