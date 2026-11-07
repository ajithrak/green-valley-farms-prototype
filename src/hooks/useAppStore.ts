import React, { useMemo, useState } from 'react';
import {
  INITIAL_HIERARCHY,
  INITIAL_LEADS,
  INITIAL_OFFERS,
  INITIAL_PLOTS,
  INITIAL_STAFF,
  INITIAL_TIMELINE,
  INITIAL_VISITS,
} from '@/data';
import type {
  CrmTab,
  CustomerPage,
  HierarchyNode,
  Lead,
  OfferRule,
  Plot,
  PlotStatus,
  SiteVisit,
  TimelineEntry,
  UserRole,
} from '@/types';

/** Central prototype store: all UI state, mock data and business-rule handlers. Swap for API-backed state in production. */
export function useAppStore() {
  const [topSection, setTopSection] = useState<'customer' | 'crm'>('customer');
  const [customerPage, setCustomerPage] = useState<CustomerPage>('home');
  const [activePlotNumber, setActivePlotNumber] = useState('A-03');

  // CRM Navigation State
  const [crmTab, setCrmTab] = useState<CrmTab>('admin_dash');
  const [currentRole, setCurrentRole] = useState<UserRole>('Admin');
  const [lang, setLang] = useState<'en' | 'te'>('en');
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [loginIdentifier, setLoginIdentifier] = useState('rajesh@greenvalleyfarms.in');
  const [loginPassword, setLoginPassword] = useState('pass123');
  const [loginError, setLoginError] = useState('');
  const [isInactiveAccount, setIsInactiveAccount] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotStep, setForgotStep] = useState(1);
  const [forgotPhone, setForgotPhone] = useState('');

  // Profile State with Masked Financials
  const [showPayoutDetails, setShowPayoutDetails] = useState(false);
  const [showConfirmUnmaskModal, setShowConfirmUnmaskModal] = useState(false);

  // Interactive Data State
  const [plots, setPlots] = useState<Plot[]>(INITIAL_PLOTS);
  const [selectedPlot, setSelectedPlot] = useState<Plot | null>(null);
  const [leads, setLeads] = useState<Lead[]>(INITIAL_LEADS);
  const [timeline, setTimeline] = useState<Record<string, TimelineEntry[]>>(INITIAL_TIMELINE);
  const [visits] = useState<SiteVisit[]>(INITIAL_VISITS);
  const [toasts, setToasts] = useState<Array<{ id: string; title: string; desc: string }>>([]);

  // Plot Pan/Zoom State
  const [plotZoom, setPlotZoom] = useState(1);

  // Hierarchy State
  const [hierarchy, setHierarchy] = useState<HierarchyNode[]>(INITIAL_HIERARCHY);
  const [selectedPerson, setSelectedPerson] = useState<HierarchyNode | null>(INITIAL_HIERARCHY[0]);
  const [hierarchySearch, setHierarchySearch] = useState('');
  const [hierarchyError, setHierarchyError] = useState('');

  // Offers State
  const [offers, setOffers] = useState<OfferRule[]>(INITIAL_OFFERS);
  const [criteriaMetric, setCriteriaMetric] = useState('Units Booked');
  const [criteriaThreshold, setCriteriaThreshold] = useState('2');
  const [simulationResult, setSimulationResult] = useState<string | null>(null);

  // Project Setup Wizard State (5 Steps)
  const [setupStep, setSetupStep] = useState(1);
  const [newProjectCode, setNewProjectCode] = useState('GVF-CHEV-02');
  const [newProjectName, setNewProjectName] = useState('Green Valley Phase 2');
  const [newProjectLocation, setNewProjectLocation] = useState('Chevella Highway, R.R. District');
  const [newProjectPublic, setNewProjectPublic] = useState(true);

  // Plot Table Bulk State Edit
  const [selectedPlotTableIds, setSelectedPlotTableIds] = useState<string[]>([]);
  const [bulkStatusToApply, setBulkStatusToApply] = useState<PlotStatus>('available');

  // Customer Portal State Simulator
  const [portalState, setPortalState] = useState<'normal' | 'skeleton' | 'empty' | 'error'>('normal');

  const addToast = (title: string, desc: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [{ id, title, desc }, ...prev]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 5000);
  };

  // Role filtered leads
  const visibleLeads = useMemo(() => {
    return leads.filter((l) => {
      if (currentRole === 'Admin' || currentRole === 'Moderator') return true;
      if (currentRole === 'Sales Person') return l.ownerRole === 'Sales Person' || l.ownerId === 'staff-2';
      if (currentRole === 'Agent') return l.ownerRole === 'Agent' || l.referredByAgentId === 'staff-3';
      return true;
    });
  }, [leads, currentRole]);

  // Unassigned leads
  const unassignedLeads = useMemo(() => {
    return leads.filter((l) => l.ownerRole === 'Admin' || l.status === 'New');
  }, [leads]);

  // Overdue followups
  const overdueFollowUps = useMemo(() => {
    return leads.filter((l) => l.isOverdue);
  }, [leads]);

  // Authentication logic
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (isInactiveAccount) {
      setLoginError(
        'This account is currently marked INACTIVE. Contact your system administrator to reactivate your profile.',
      );
      return;
    }
    if (!loginIdentifier || !loginPassword) {
      setLoginError('Please enter both your phone/email and password.');
      return;
    }
    setLoginError('');
    setIsAuthenticated(true);
    addToast('Welcome back!', `Signed in as ${currentRole}. Redirecting to your assigned dashboard.`);
    if (currentRole === 'Admin') setCrmTab('admin_dash');
    else if (currentRole === 'Moderator') setCrmTab('moderator_dash');
    else if (currentRole === 'Sales Person') setCrmTab('leads');
    else setCrmTab('agent');
  };

  // Round-robin suggest algorithm
  const handleRoundRobinAssign = (leadId: string) => {
    const salesStaff = INITIAL_STAFF.filter((s) => s.role === 'Sales Person' || s.role === 'Agent');
    const leastLoaded = [...salesStaff].sort((a, b) => a.activeLeadsCount - b.activeLeadsCount)[0];
    if (!leastLoaded) return;

    setLeads((prev) =>
      prev.map((l) => {
        if (l.id === leadId) {
          const history = l.assignedHistory || [];
          return {
            ...l,
            ownerId: leastLoaded.id,
            ownerName: leastLoaded.name,
            ownerRole: leastLoaded.role,
            status: 'Contacted',
            assignedHistory: [
              ...history,
              {
                date: '07 Nov 2026, 12:15 PM IST',
                from: l.ownerName,
                to: leastLoaded.name,
                reason: 'Round-Robin balanced assignment',
              },
            ],
          };
        }
        return l;
      }),
    );
    addToast(
      'Assigned via Round-Robin',
      `Lead assigned to ${leastLoaded.name} (Current workload: ${leastLoaded.activeLeadsCount + 1} active leads).`,
    );
  };

  // Circular reporting prevention validator
  const handleUpdateManager = (personId: string, proposedManagerId: string) => {
    setHierarchyError('');
    if (personId === proposedManagerId) {
      setHierarchyError('Validation Error: A staff member cannot report to themselves.');
      return;
    }

    let curr = hierarchy.find((h) => h.id === proposedManagerId);
    while (curr && curr.reportsToId) {
      if (curr.reportsToId === personId) {
        setHierarchyError(
          `Validation Error: Circular reporting line detected! ${curr.name} already reports down this hierarchy line.`,
        );
        return;
      }
      curr = hierarchy.find((h) => h.id === curr?.reportsToId);
    }

    setHierarchy((prev) =>
      prev.map((h) => {
        if (h.id === personId) {
          return {
            ...h,
            reportsToId: proposedManagerId,
            transferHistory: [
              ...h.transferHistory,
              { date: '07 Nov 2026', fromRole: h.levelTitle, toRole: h.levelTitle, approver: 'Admin Console' },
            ],
          };
        }
        return h;
      }),
    );
    addToast('Reporting Line Updated', 'Team hierarchy and approval chains refreshed with no circular links.');
  };

  return {
    topSection,
    setTopSection,
    customerPage,
    setCustomerPage,
    activePlotNumber,
    setActivePlotNumber,
    crmTab,
    setCrmTab,
    currentRole,
    setCurrentRole,
    lang,
    setLang,
    isDarkMode,
    setIsDarkMode,
    isAuthenticated,
    setIsAuthenticated,
    loginIdentifier,
    setLoginIdentifier,
    loginPassword,
    setLoginPassword,
    loginError,
    setLoginError,
    isInactiveAccount,
    setIsInactiveAccount,
    showForgotModal,
    setShowForgotModal,
    forgotStep,
    setForgotStep,
    forgotPhone,
    setForgotPhone,
    showPayoutDetails,
    setShowPayoutDetails,
    showConfirmUnmaskModal,
    setShowConfirmUnmaskModal,
    plots,
    setPlots,
    selectedPlot,
    setSelectedPlot,
    leads,
    setLeads,
    timeline,
    setTimeline,
    toasts,
    setToasts,
    plotZoom,
    setPlotZoom,
    hierarchy,
    setHierarchy,
    selectedPerson,
    setSelectedPerson,
    hierarchySearch,
    setHierarchySearch,
    hierarchyError,
    setHierarchyError,
    offers,
    setOffers,
    criteriaMetric,
    setCriteriaMetric,
    criteriaThreshold,
    setCriteriaThreshold,
    simulationResult,
    setSimulationResult,
    setupStep,
    setSetupStep,
    newProjectCode,
    setNewProjectCode,
    newProjectName,
    setNewProjectName,
    newProjectLocation,
    setNewProjectLocation,
    newProjectPublic,
    setNewProjectPublic,
    selectedPlotTableIds,
    setSelectedPlotTableIds,
    bulkStatusToApply,
    setBulkStatusToApply,
    portalState,
    setPortalState,
    addToast,
    visibleLeads,
    unassignedLeads,
    overdueFollowUps,
    handleLogin,
    handleRoundRobinAssign,
    handleUpdateManager,
    visits,
  };
}

export type AppStore = ReturnType<typeof useAppStore>;
