"""Build GAHN's original, dependency-free SVG career illustration collection.

Every scene is drawn here; no stock photos, logos, remote assets, or generated
raster images are used. Run from the repository root after editorial changes.
"""
from pathlib import Path
import html
import json
import re

ROOT = Path(__file__).resolve().parents[1]
catalog = (ROOT / 'lib/careerCatalog.ts').read_text()
careers = json.loads(re.search(r'export const careerSections: CareerSection\[\] = (\[.*?\n\]);', catalog, re.S)[1])
INK = '#183452'
MUTED = '#71849A'
LINE = '#D9E3ED'
BLUE = '#4479D5'
TEAL = '#3F927F'
GOLD = '#D7A050'
LILAC = '#9380BC'


def rect(x, y, w, h, fill='white', r=12, stroke=LINE):
    return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{r}" fill="{fill}" stroke="{stroke}"/>'


def text(x, y, value, size=16, fill=INK, weight=500):
    return f'<text x="{x}" y="{y}" font-family="Arial, sans-serif" font-size="{size}" font-weight="{weight}" fill="{fill}">{html.escape(str(value))}</text>'


def line(x1, y1, x2, y2, color=LINE, width=2, dash=''):
    return f'<path d="M{x1} {y1}L{x2} {y2}" fill="none" stroke="{color}" stroke-width="{width}" stroke-linecap="round" stroke-dasharray="{dash}"/>'


def circle(x, y, radius, fill, stroke='none'):
    return f'<circle cx="{x}" cy="{y}" r="{radius}" fill="{fill}" stroke="{stroke}"/>'


def panel(x, y, w, h, title, fill='white'):
    return rect(x, y, w, h, fill) + text(x + 22, y + 34, title, 15, INK, 600) + line(x + 20, y + 52, x + w - 20, y + 52)


def bars(x, y, values, color=BLUE, width=28, gap=16):
    return ''.join(rect(x + i * (width + gap), y - v, width, v, color, 4, color) for i, v in enumerate(values))


def rows(x, y, items, width=200, color=BLUE):
    return ''.join(circle(x + 4, y + i * 42 - 5, 4, color) + text(x + 22, y + i * 42, label, 14) + line(x, y + i * 42 + 14, x + width, y + i * 42 + 14) for i, label in enumerate(items))


def table(x, y, headers, data, widths):
    total = sum(widths)
    result = rect(x, y, total, (len(data) + 1) * 42, '#FFFFFF', 7)
    result += rect(x, y, total, 42, '#EDF3FA', 7, '#EDF3FA')
    for row_index, row in enumerate([headers] + data):
        dx = 0
        for value, width in zip(row, widths):
            result += text(x + dx + 14, y + row_index * 42 + 27, value, 13, MUTED if row_index == 0 else INK, 600 if row_index == 0 else 500)
            dx += width
        if row_index > 0:
            result += line(x + 10, y + row_index * 42, x + total - 10, y + row_index * 42)
    return result


def chart(x, y, kind='bars'):
    result = line(x, y, x + 260, y) + line(x, y, x, y - 145)
    for dy in [45, 90, 135]:
        result += line(x, y - dy, x + 260, y - dy, '#E7EDF4', 1)
    if kind == 'scatter':
        for i, (dx, dy) in enumerate([(15, 22), (35, 48), (64, 39), (80, 74), (112, 60), (145, 99), (170, 76), (190, 121), (220, 114), (245, 139)]):
            result += circle(x + dx, y - dy, 6, TEAL if i % 2 else LILAC)
        result += line(x + 5, y - 12, x + 250, y - 138, BLUE, 3)
    elif kind == 'line':
        result += f'<path d="M{x} {y-16}l45 -17 40 9 45 -44 40 12 45 -45 40 -18" fill="none" stroke="{BLUE}" stroke-width="5" stroke-linejoin="round"/>'
        result += f'<path d="M{x} {y-9}l45 -10 40 -8 45 -17 40 -18 45 -10 40 -14" fill="none" stroke="{TEAL}" stroke-width="3" stroke-dasharray="7 7"/>'
    else:
        result += bars(x + 16, y, [54, 86, 73, 122, 104, 140], width=25, gap=17)
    return result


def code_scene(language, lines, side_title, side_rows):
    result = panel(90, 145, 470, 310, language, '#152D49')
    result += rect(90, 145, 470, 54, '#1E3B5D', 12, '#1E3B5D') + text(115, 178, language, 15, '#D9E7F7', 600)
    for i, content in enumerate(lines):
        result += text(111, 227 + 34 * i, f'{i+1:02}', 12, '#7F98B7')
        result += text(145, 227 + 34 * i, content, 15, ['#9DD3C0', '#B5C9F5', '#E9CB94'][i % 3])
    result += panel(585, 175, 285, 245, side_title) + rows(609, 255, side_rows, 235, TEAL)
    return result


def diagram(title, labels, layout='row'):
    result = panel(90, 145, 780, 310, title)
    if layout == 'network':
        points = [(220, 245), (220, 355), (440, 205), (440, 300), (440, 395), (680, 245), (680, 355)]
        for a in [0, 1]:
            for b in [2, 3, 4]: result += line(*points[a], *points[b], '#B5C8E2')
        for a in [2, 3, 4]:
            for b in [5, 6]: result += line(*points[a], *points[b], '#B5C8E2')
        for i, point in enumerate(points): result += circle(*point, 22, [BLUE, TEAL, LILAC][i % 3])
        result += text(171, 425, labels[0], 13) + text(383, 425, labels[1], 13) + text(632, 425, labels[2], 13)
    elif layout == 'cloud':
        result += rect(335, 220, 260, 90, '#EAF0FA') + text(378, 273, labels[0], 21, INK, 600)
        for i, label in enumerate(labels[1:]):
            px = 145 + i * 230
            result += line(465, 310, px + 90, 365, BLUE) + rect(px, 365, 180, 55, '#F3F7FB') + text(px + 20, 398, label, 14)
    else:
        for i, label in enumerate(labels):
            px = 118 + i * 186
            if i: result += line(px - 27, 300, px - 4, 300, BLUE, 3)
            result += rect(px, 245, 155, 112, ['#EDF3FA', '#ECF5F0', '#F4EFFA', '#FCF2E4'][i % 4])
            result += text(px + 15, 280, f'0{i+1}', 12, MUTED) + text(px + 15, 320, label, 15, INK, 600)
    return result


def scene(key):
    if key == 'software-developer-engineer': return code_scene('task-service / routes.ts', ['async function createTask(req) {', '  const input = validate(req.body);', '  const task = await save(input);', '  return response(task, 201);', '}'], 'Application layers', ['Browser interface', 'Validated API', 'Relational database'])
    if key == 'python-developer': return code_scene('inventory / import.py', ['def import_rows(source):', '    rows = read_csv(source)', '    valid = validate(rows)', '    save_items(valid)', '    return import_report()'], 'Import results', ['128 records checked', '3 rows to review', 'Source file preserved'])
    if key == 'front-end-developer':
        return panel(90, 145, 510, 310, 'Responsive interface') + rect(114, 218, 170, 210, '#EAF0FA') + text(133, 255, 'Find a service', 18, INK, 600) + rect(133, 275, 130, 27) + rect(133, 320, 130, 85, '#B8D2ED') + rect(305, 218, 270, 90, '#F4F0FA') + rect(305, 328, 125, 100, '#EDF5EF') + rect(448, 328, 127, 100, '#FBEEDB') + panel(635, 185, 220, 240, 'Mobile') + rect(658, 252, 172, 25, '#EAF0FA') + rect(658, 295, 172, 100, '#B8D2ED')
    if key == 'cyber-security-analyst':
        return panel(90, 145, 460, 310, 'Defensive event review') + table(112, 220, ['Time', 'Event', 'Status'], [['09:12', 'Sign-in', 'Review'], ['09:14', 'MFA', 'Verified'], ['09:18', 'Access', 'Allowed'], ['09:21', 'Alert', 'Triage']], [90, 180, 145]) + panel(585, 170, 285, 255, 'Trust boundary') + f'<path d="M728 230l65 22v60c0 45-65 72-65 72s-65-27-65-72v-60Z" fill="#E3F1EB" stroke="{TEAL}" stroke-width="3"/>' + circle(728, 290, 15, TEAL) + rect(720, 300, 16, 32, TEAL, 3, TEAL)
    if key == 'devops-engineer': return diagram('Release pipeline', ['Build', 'Test', 'Stage', 'Release']) + text(118, 405, 'Reviewable artifacts / explicit rollback', 15, MUTED)
    if key == 'cloud-architect': return diagram('Cloud architecture', ['Service boundary', 'Compute', 'Database', 'Object storage'], 'cloud')
    if key == 'technical-support-engineer-analyst': return panel(90, 145, 465, 310, 'Technical case / 024') + rows(115, 235, ['Reproduce the issue', 'Inspect the error log', 'Test one hypothesis', 'Document the resolution'], 415) + panel(590, 185, 280, 225, 'Diagnostic trace') + chart(612, 375, 'line')
    if key == 'qa-automation-engineer': return panel(90, 145, 780, 310, 'Quality review / user workflows') + table(115, 218, ['User flow', 'Browser', 'API', 'Review'], [['Sign in', 'Pass', 'Pass', 'Ready'], ['Edit profile', 'Pass', 'Pass', 'Ready'], ['Invalid input', 'Check', 'Pass', 'Review'], ['Keyboard access', 'Pass', '--', 'Ready']], [260, 150, 150, 170])
    if key == 'data-analyst': return panel(90, 145, 380, 310, 'Orders / clean sample') + table(112, 219, ['Month', 'Orders', 'Returns'], [['Jan', '148', '8'], ['Feb', '173', '7'], ['Mar', '192', '9'], ['Apr', '210', '6']], [110, 95, 125]) + panel(495, 145, 375, 310, 'Monthly comparison') + chart(545, 410)
    if key == 'data-scientist': return panel(90, 145, 440, 310, 'Explore / model / evaluate') + chart(160, 410, 'scatter') + panel(565, 175, 305, 250, 'Study notebook') + rows(588, 257, ['Define a baseline', 'Check for leakage', 'Inspect model errors', 'Document uncertainty'], 255, LILAC)
    if key == 'machine-learning-engineer': return diagram('Model development and inference', ['Features', 'Model layers', 'Predictions'], 'network')
    if key == 'business-intelligence-analyst':
        result = panel(90, 145, 780, 310, 'Business intelligence / metric definitions')
        for i, (label, value) in enumerate([('Orders', '210'), ('Retention', 'Cohort'), ('Revenue', 'Period')]): result += rect(115+i*250, 215, 230, 70, '#EDF3FA') + text(132+i*250, 240, label, 12, MUTED) + text(132+i*250, 268, value, 20, INK, 600)
        return result + bars(135, 425, [65, 88, 76, 110, 95], TEAL, 30, 24) + rows(465, 330, ['One metric dictionary', 'Reconciled source totals', 'Controlled report access'], 340)
    if key == 'ai-automation-specialist': return diagram('Validated automation / human approval', ['Intake', 'Validate', 'Review', 'Route']) + text(118, 405, 'Bounded retries / no duplicate actions', 15, MUTED)
    if key == 'user-interface-user-experience-ui-ux-designer':
        return panel(90, 145, 780, 310, 'Interface prototypes / booking flow') + ''.join(rect(120+i*245, 220, 215, 195, ['#ECF3F9','#F3EFF9','#EDF5EF'][i]) + rect(138+i*245, 240, 175, 28) + rect(138+i*245, 286, 175, 70) + rect(205+i*245, 375, 108, 22, BLUE, 7, BLUE) for i in range(3))
    if key == 'graphic-designer': return rect(130, 130, 340, 355, '#EFC184') + circle(301, 267, 80, '#C96B4D') + text(164, 386, 'FIELD', 46, INK, 700) + text(164, 430, 'NOTES', 46, INK, 700) + panel(530, 170, 300, 260, 'Visual identity') + ''.join(circle(574+i*57, 258, 21, c) for i,c in enumerate([INK, '#C96B4D', '#EFC184', '#E8E9E2'])) + text(557, 330, 'Type / space / rhythm', 18) + line(557, 355, 800, 355, INK, 5) + line(557, 377, 720, 377, '#C96B4D', 5)
    if key == 'video-editor':
        result = panel(90, 145, 780, 310, 'Editorial timeline / explainer') + rect(117, 210, 400, 130, '#193B54') + circle(320, 274, 40, '#78A99C') + text(550, 242, 'Picture', 15) + text(550, 280, 'Sound', 15) + text(550, 318, 'Captions', 15)
        for i in range(7): result += rect(118+i*102, 370, 91, 25, [BLUE, TEAL, LILAC][i%3], 4)
        result += line(118, 420, 820, 420, TEAL, 5) + line(465, 350, 465, 440, GOLD, 3)
        return result
    if key == 'technical-writer': return panel(90, 145, 780, 310, 'Documentation / import guide') + rows(115, 235, ['Quickstart', 'API reference', 'Troubleshooting', 'Change log'], 200) + text(365, 235, 'Import your first file', 24, INK, 600) + text(365, 273, '1. Prepare the sample data', 16) + rect(365, 295, 465, 65, '#19334F') + text(385, 334, 'POST /imports  { source: sample }', 15, '#B7D9D1') + text(365, 395, 'Expected result / reviewed error cases', 15, MUTED)
    if key == 'content-writer-editor': return panel(155, 135, 650, 335, 'Editorial desk / original article') + text(190, 235, 'A useful answer starts', 29, INK, 600) + text(190, 276, 'with a specific question.', 29, INK, 600) + line(190, 312, 615, 312, '#B9C8D9', 6) + line(190, 337, 690, 337, '#CDD8E3', 6) + line(190, 362, 650, 362, '#CDD8E3', 6) + rect(565, 385, 205, 45, '#F7ECDC') + text(583, 413, 'Source checked', 15, '#8A6229')
    if key == 'digital-marketing-specialist': return diagram('Campaign / measurable customer journey', ['Audience', 'Message', 'Page', 'Measure']) + text(118, 405, 'Explicit goals / accurate product claims', 15, MUTED)
    if key == 'seo-specialist': return panel(90, 145, 780, 310, 'Search discoverability review') + rect(118, 215, 450, 45, '#F0F4FA', 22) + circle(143, 236, 9, 'none', BLUE) + line(150, 244, 157, 251, BLUE) + text(175, 242, 'A useful answer to a real question', 14, MUTED) + rows(120, 308, ['Page title and intent', 'Crawl and canonical signals', 'Accessible content structure'], 410) + circle(710, 315, 75, '#E6F2EC') + text(665, 307, 'AUDIT', 23, TEAL, 600) + text(661, 343, 'Source first', 15, TEAL)
    if key == 'social-media-manager':
        result = panel(90, 145, 780, 310, 'Content calendar / community')
        for i, label in enumerate(['Explain', 'Demonstrate', 'Discuss']): result += rect(118+i*249, 217, 225, 165, ['#E7EEF9','#F6EAD9','#E6F1EA'][i]) + circle(155+i*249, 251, 16, [BLUE,GOLD,TEAL][i]) + text(138+i*249, 297, label, 22, INK, 600) + line(138+i*249, 323, 310+i*249, 323, '#C0CFDB', 5) + text(138+i*249, 360, f'Post 0{i+1}', 12, MUTED)
        return result + text(118, 425, 'Original drafts / accessible media / respectful replies', 15, MUTED)
    if key == 'email-marketing-specialist': return panel(115, 145, 475, 310, 'Email preview / welcome series') + text(142, 237, 'A useful place to start.', 28, INK, 600) + line(142, 273, 539, 273, '#C3D0DF', 6) + line(142, 300, 480, 300, '#D9E2EC', 6) + rect(142, 340, 160, 43, BLUE, 8, BLUE) + text(163, 367, 'Explore the guide', 15, 'white') + panel(625, 190, 220, 220, 'Permission first') + rows(645, 268, ['Opted in', 'Suppression', 'Clear next step'], 177, TEAL)
    if key == 'sales-representative': return panel(90, 145, 780, 310, 'Opportunity pipeline / discovery to follow-up') + table(115, 218, ['Opportunity', 'Need', 'Next step'], [['North studio', 'Team workflow', 'Discovery'], ['Maple shop', 'Order tracking', 'Demo'], ['Field office', 'Reporting', 'Clarify fit'], ['Harbor team', 'Support', 'Follow up']], [250, 250, 230])
    if key == 'bookkeeper': return panel(90, 145, 780, 310, 'Monthly ledger / source-backed entries') + table(115, 218, ['Account', 'Debit', 'Credit', 'Source'], [['Office expense', '125.00', '--', 'Receipt 08'], ['Cash', '--', '125.00', 'Bank line 12'], ['Receivable', '640.00', '--', 'Invoice 24'], ['Service income', '--', '640.00', 'Invoice 24']], [260, 145, 145, 180])
    if key == 'accountant': return panel(90, 145, 365, 310, 'Close review') + rows(115, 235, ['Trial balance', 'Adjusting entries', 'Supporting schedules', 'Review questions'], 310, LILAC) + panel(485, 145, 385, 310, 'Financial statements') + table(507, 218, ['Schedule', 'Status'], [['Income statement', 'Linked'], ['Balance sheet', 'Reconciled'], ['Cash flow', 'Reviewed'], ['Notes', 'Open items']], [220, 115])
    if key == 'financial-analyst': return panel(90, 145, 780, 310, 'Driver-based forecast / scenarios') + chart(140, 413, 'line') + table(475, 222, ['Assumption', 'Base', 'Downside'], [['Customers', '240', '180'], ['Price', '29', '25'], ['Unit costs', '12', '15'], ['Cash timing', '30 days', '45 days']], [170, 80, 120])
    if key == 'investment-analyst': return panel(90, 145, 425, 310, 'Research / valuation range') + bars(132, 410, [90, 135, 110, 165], LILAC, 45, 40) + panel(550, 175, 320, 250, 'Thesis and evidence') + rows(575, 255, ['Business drivers', 'Valuation assumptions', 'Downside case', 'Disconfirming evidence'], 265, GOLD)
    if key == 'credit-analyst': return panel(90, 145, 780, 310, 'Fictional credit review') + table(115, 218, ['Evidence', 'Measure', 'Review'], [['Cash flow', 'Coverage', 'Reconciled'], ['Balance sheet', 'Leverage', 'Reviewed'], ['Stress scenario', 'Liquidity', 'Check'], ['Missing records', 'Completeness', 'Request']], [270, 215, 245])
    if key == 'insurance-underwriter': return panel(90, 145, 400, 310, 'Risk review / fictional case') + table(112, 219, ['Factor', 'Evidence'], [['Exposure', 'Documented'], ['History', 'Review'], ['Limits', 'Referral'], ['Authority', 'Check']], [170, 175]) + panel(525, 180, 345, 250, 'Review matrix') + ''.join(rect(550+i%3*96, 253+i//3*66, 82, 52, ['#E6F1EA','#F3EDD9','#EEDBD3'][i%3], 5) for i in range(6))
    if key == 'customer-service-representative': return panel(90, 145, 485, 310, 'Customer conversation') + rect(115, 218, 340, 64, '#EDF2F9') + text(133, 244, 'Can you help with my order?', 16) + rect(187, 305, 360, 90, '#E3F1EA') + text(207, 337, 'Let us check the details together.', 16) + text(207, 366, 'Here is the next step...', 15, MUTED) + panel(610, 180, 260, 245, 'Case record') + rows(632, 260, ['Request', 'Action', 'Owner', 'Follow-up'], 210, TEAL)
    if key == 'project-manager':
        result = panel(90, 145, 780, 310, 'Project board / scope, owners, delivery')
        for i, label in enumerate(['Planned', 'In progress', 'Review']):
            result += text(120+i*250, 225, label, 15, INK, 600)
            for j in range(2): result += rect(115+i*250, 247+j*84, 230, 65, ['#EDF2F9','#F7EDDC','#E6F1EA'][i]) + line(133+i*250, 270+j*84, 285+i*250, 270+j*84, '#AABDD1', 5) + circle(319+i*250, 291+j*84, 7, [BLUE,GOLD,TEAL][i])
        return result
    if key == 'virtual-assistant':
        result = panel(90, 145, 510, 310, 'Weekly calendar / delegated tasks')
        for i, label in enumerate(['Mon', 'Tue', 'Wed', 'Thu', 'Fri']): result += text(120+i*94, 225, label, 13, MUTED) + line(115+i*94, 242, 115+i*94, 430)
        for i in range(5): result += rect(125+i*94, 258+(i%3)*40, 73, 60, ['#BCD2F0','#C7DED3','#DACCEC'][i%3], 5)
        return result + panel(630, 185, 240, 230, 'Admin desk') + rows(651, 263, ['Draft replies', 'Meeting notes', 'Task tracker'], 195, LILAC)
    if key == 'customer-success-specialist': return panel(90, 145, 780, 310, 'Customer success / agreed milestones') + rows(120, 235, ['Account goals', 'Onboarding', 'Adoption review', 'Next actions'], 260, TEAL) + rect(440, 225, 385, 170, '#EDF4F1') + text(468, 260, 'A shared success plan', 22, INK, 600) + line(480, 321, 780, 321, TEAL, 4) + ''.join(circle(480+i*100, 321, 12, TEAL if i<2 else '#B9CFC5') + text(460+i*100, 360, f'Step {i+1}', 12, MUTED) for i in range(4))
    if key == 'operations-coordinator': return diagram('Operations / reliable handoffs', ['Request', 'Assign', 'Check', 'Handover']) + text(118, 405, 'Process owners / exception log / quality checks', 15, MUTED)
    if key == 'recruiter-talent-sourcer':
        result = panel(90, 145, 780, 310, 'Role-related evidence / candidate review')
        for i, name in enumerate(['Profile A', 'Profile B', 'Profile C']): result += rect(118+i*249, 217, 225, 195, '#F4F7FB') + circle(160+i*249, 260, 22, ['#B6CBE9','#D3C6E5','#BCD6C9'][i]) + text(138+i*249, 314, name, 19, INK, 600) + text(138+i*249, 346, 'Skills / evidence / questions', 12, MUTED) + line(138+i*249, 375, 316+i*249, 375, '#C0CDDC', 5)
        return result
    if key == 'medical-billing-coding-specialist': return panel(90, 145, 780, 310, 'Synthetic claim / administrative review') + table(115, 218, ['Field', 'Source', 'Review'], [['Encounter date', 'Sample record', 'Matched'], ['Documentation', 'Fictional note', 'Clarify'], ['Reference version', 'Current guide', 'Check'], ['Follow-up', 'Review log', 'Assigned']], [240, 260, 230])
    if key == 'health-information-specialist': return panel(90, 145, 440, 310, 'Synthetic document register') + table(112, 219, ['Record', 'Document', 'Quality'], [['H-024', 'Intake', 'Reviewed'], ['H-024', 'Encounter', 'Missing field'], ['H-025', 'Release', 'Approval'], ['H-026', 'Correction', 'Tracked']], [95, 150, 145]) + panel(565, 185, 305, 235, 'Access boundaries') + rows(587, 263, ['Minimum necessary', 'Verified request', 'Documented release'], 260, TEAL)
    if key == 'patient-scheduling-coordinator': return panel(90, 145, 780, 310, 'Appointment coordination / fictional schedule') + table(115, 218, ['Time', 'Appointment', 'Resource', 'Status'], [['09:00', 'Intake A', 'Room 1', 'Confirmed'], ['09:30', 'Follow-up B', 'Room 2', 'Hold'], ['10:00', 'Intake C', 'Room 1', 'Review'], ['10:30', 'Follow-up D', 'Room 2', 'Confirmed']], [120, 250, 170, 190])
    if key == 'contract-administrator': return panel(90, 145, 430, 310, 'Contract register / fictional terms') + rows(115, 235, ['Authoritative version', 'Approval record', 'Obligations and owners', 'Renewal reminders'], 370, GOLD) + panel(555, 175, 315, 250, 'Obligation calendar') + table(577, 249, ['Due', 'Owner', 'Action'], [['01 Jun', 'Team A', 'Review'], ['15 Jun', 'Team B', 'Notify'], ['30 Jun', 'Legal', 'Approve']], [80, 90, 100])
    if key == 'legal-operations-coordinator': return panel(90, 145, 780, 310, 'Legal operations / matter coordination') + table(115, 218, ['Matter', 'Review owner', 'Next action'], [['Request 018', 'Counsel', 'Clarify scope'], ['Request 019', 'Operations', 'Collect records'], ['Request 020', 'Counsel', 'Review terms'], ['Request 021', 'Finance', 'Check invoice']], [210, 225, 295])
    if key == 'compliance-specialist': return panel(90, 145, 780, 310, 'Control evidence / fictional review') + table(115, 218, ['Control', 'Evidence', 'Owner', 'Review'], [['Access review', 'Sample log', 'IT', 'Complete'], ['Approval', 'Record 08', 'Ops', 'Exception'], ['Retention', 'Policy note', 'Legal', 'Clarify'], ['Remediation', 'Action 04', 'Owner', 'Verify']], [210, 210, 130, 180])
    raise ValueError(f'No illustration scene for {key}')


def main():
    destination = ROOT / 'public/illustrations/careers'
    destination.mkdir(parents=True, exist_ok=True)
    palette = ['#EDF2F8', '#F0EDF7', '#F9F0E5', '#EAF3F0', '#EEF2F8', '#EEF4F2', '#F7F0E8']
    groups = list(dict.fromkeys(c['category'] for c in careers))
    for index, career in enumerate(careers):
        background = palette[groups.index(career['category'])]
        svg = f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 600" width="960" height="600"><title>{html.escape(career["title"])} — original GAHN career illustration</title>'
        svg += rect(0, 0, 960, 600, background, 0, background)
        svg += circle(900, 30, 180, '#FFFFFF') + circle(20, 575, 160, '#FFFFFF')
        svg += text(92, 89, 'GAHN / CAREER STUDIES', 14, MUTED, 600) + text(92, 535, career['category'].upper(), 13, MUTED, 600)
        svg += text(830, 535, f'{index+1:02} / 41', 13, MUTED)
        svg += scene(career['slug']) + '</svg>'
        (destination / f'{career["slug"]}.svg').write_text(svg)
    print(f'Built {len(careers)} original career illustrations.')


if __name__ == '__main__':
    main()
