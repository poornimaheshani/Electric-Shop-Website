function normalizeText(value) {
  return (value || '').toString().trim();
}

function normalizeDate(value) {
  const date = normalizeText(value);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return '';
  }
  return date;
}

function buildCustomerFilters(query) {
  const search = normalizeText(query.search);
  const status = normalizeText(query.status).toLowerCase();
  const clauses = [];
  const params = [];

  if (search) {
    const like = `%${search}%`;
    clauses.push(
      '(CAST(c.id AS CHAR) LIKE ? OR LOWER(c.name) LIKE ? OR LOWER(c.email) LIKE ? OR c.phone LIKE ?)'
    );
    params.push(like, `%${search.toLowerCase()}%`, `%${search.toLowerCase()}%`, like);
  }

  if (status) {
    clauses.push('LOWER(c.status) = ?');
    params.push(status);
  }

  return {
    whereClause: clauses.length ? `WHERE ${clauses.join(' AND ')}` : '',
    params,
    filters: { search, status }
  };
}

function buildOrderFilters(query) {
  const search = normalizeText(query.search);
  const status = normalizeText(query.status).toLowerCase();
  const from = normalizeDate(query.from);
  const to = normalizeDate(query.to);
  const clauses = [];
  const params = [];

  if (search) {
    const like = `%${search}%`;
    const likeLower = `%${search.toLowerCase()}%`;
    clauses.push(
      '(CAST(o.id AS CHAR) LIKE ? OR CAST(o.customer_id AS CHAR) LIKE ? OR LOWER(c.name) LIKE ?)'
    );
    params.push(like, like, likeLower);
  }

  if (status) {
    clauses.push('LOWER(o.status) = ?');
    params.push(status);
  }

  if (from) {
    clauses.push('DATE(o.created_at) >= ?');
    params.push(from);
  }

  if (to) {
    clauses.push('DATE(o.created_at) <= ?');
    params.push(to);
  }

  return {
    whereClause: clauses.length ? `WHERE ${clauses.join(' AND ')}` : '',
    params,
    filters: { search, status, from, to }
  };
}

module.exports = {
  buildCustomerFilters,
  buildOrderFilters
};