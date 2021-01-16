"""add user column

Revision ID: e20bb74188d7
Revises: 726f693370c6
Create Date: 2021-01-14 19:41:22.403282

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'e20bb74188d7'
down_revision = '726f693370c6'
branch_labels = None
depends_on = None


def upgrade():
    op.add_column(
        'users', sa.Column('email', sa.String(255), unique=True, index=True))


def downgrade():
    op.drop_column('users', 'email')
