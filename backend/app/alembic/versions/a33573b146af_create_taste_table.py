"""create taste table

Revision ID: a33573b146af
Revises: ae8603b30641
Create Date: 2021-01-16 08:52:23.347887

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'a33573b146af'
down_revision = 'ae8603b30641'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        'tastes',
        sa.Column('id', sa.Integer, primary_key=True),
        sa.Column('user_id', sa.Integer),
        sa.Column('taste', sa.JSON)
    )


def downgrade():
    op.drop_table('tastes')
